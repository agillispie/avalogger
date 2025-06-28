import type { FullLoggerTheme, AnsiStyle, LogLevel, LoggerOptions } from './types'

import { defaultTheme } from './themes';
import { styleText, colorJson, LOG_LEVEL_RANK } from './utils';


export class AvaLogger {
    private theme: FullLoggerTheme;
    private useColor: boolean;
    private showTimestamp: boolean;
    private disableTimestamp: boolean;
    private minLevel: LogLevel;
    private enabledLevels: Set<LogLevel>;

    constructor(options?: LoggerOptions) {
        const mergedTheme = {
            ...defaultTheme,
            ...options?.theme,
            json: { ...defaultTheme.json, ...(options?.theme?.json ?? {}) },
            levels: { ...defaultTheme.levels, ...(options?.theme?.levels ?? {}) },
            message: { ...defaultTheme.message, ...(options?.theme?.message ?? {}) },
            timestamp: { ...defaultTheme.timestamp, ...(options?.theme?.timestamp ?? {}) },
        } satisfies FullLoggerTheme;

        this.theme = mergedTheme;
        this.useColor = !options?.disableColor;
        this.showTimestamp = options?.showTimestamp ?? true;
        this.disableTimestamp = options?.disableTimestamp ?? false;
        this.minLevel = options?.minLevel ?? 'debug';
        this.enabledLevels = new Set(options?.enabledLevels ?? Object.keys(mergedTheme.levels));
    }

    private shouldLog(level: LogLevel): boolean {
        return this.enabledLevels.has(level) &&
            (LOG_LEVEL_RANK[level] ?? 999) >= (LOG_LEVEL_RANK[this.minLevel] ?? 0);
    }

    private formatPrefix(level: LogLevel): string {
        const levelStyle = this.theme.levels[level] ?? { foreground: '\x1b[97m', background: '\x1b[40m' };
        const label = styleText(level.toUpperCase(), levelStyle, this.theme.reset, this.useColor);
        const timestamp = this.showTimestamp && !this.disableTimestamp
            ? styleText(`[${new Date().toISOString()}]`, this.theme.timestamp, this.theme.reset, this.useColor)
            : '';
        return `${timestamp} ${label}`.trim();
    }

    private renderMessage(message: string): string {
        return styleText(message, this.theme.message, this.theme.reset, this.useColor);
    }

    private renderObject(data: unknown): string {
        return colorJson(data, this.theme.json, this.theme.reset, this.useColor);
    }

    private logWithLevel(level: LogLevel, ...args: unknown[]): void {
        if (!this.shouldLog(level)) return;

        const prefix = this.formatPrefix(level);
        const parts: string[] = [];

        for (const arg of args) {
            if (typeof arg === 'object' && arg !== null) {
                parts.push(this.renderObject(arg));
            } else {
                parts.push(this.renderMessage(String(arg)));
            }
        }

        console.log(`${prefix} ${parts.join(' ')}`);
    }

    log(...args: unknown[]): void {
        this.logWithLevel('info', ...args);
    }

    warn(...args: unknown[]): void {
        this.logWithLevel('warn', ...args);
    }

    fatal(...args: unknown[]): void {
        this.logWithLevel('fatal', ...args);
    }

    debug(...args: unknown[]): void {
        this.logWithLevel('debug', ...args);
    }

    panic(...args: unknown[]): never {
        this.logWithLevel('fatal', ...args);
        process.exit(1)
    }

    shutdown(...args: unknown[]): void {
        this.logWithLevel('info', ...args);
        process.exit(0);
    }

    createLevel(level: LogLevel, style?: AnsiStyle): (...
        args: unknown[]) => void {
        this.theme.levels[level] = style || { foreground: '\x1b[97m', background: '\x1b[40m' };
        this.enabledLevels.add(level);
        return (...args: unknown[]) => this.logWithLevel(level, ...args);
    }
}

const logger = new AvaLogger();

logger.log("yeet man")
logger.shutdown("Shutting down gracefully...");
