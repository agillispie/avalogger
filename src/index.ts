import type { FullLoggerTheme, AnsiStyle, LogLevel, LoggerOptions, LoggerTransport, LoggerTransportOptions } from './types'

import { defaultTheme } from './themes';
import { styleText, colorJson, LOG_LEVEL_RANK } from './utils';
import { FileTransport } from './transports/file-transport';
import { ConsoleTransport as ConsoleLog } from './transports/console-transport';



export class AvaLogger {
    private theme: FullLoggerTheme;
    private useColor: boolean;
    private showTimestamp: boolean;
    private disableTimestamp: boolean;
    private minLevel: LogLevel;
    private enabledLevels: Set<LogLevel>;
    transports?: LoggerTransport[];

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
        this.transports = options?.transports ?? [];
    }

    private shouldLog(level: LogLevel): boolean {
        return (
            this.enabledLevels.has(level) &&
            (LOG_LEVEL_RANK[level] ?? 999) >= (LOG_LEVEL_RANK[this.minLevel] ?? 0)
        );
    }

    private formatPrefix(level: LogLevel, options: LoggerTransportOptions): string {
        const levelStyle = options.theme?.levels?.[level] ?? {
            foreground: '\x1b[97m',
            background: '\x1b[40m'
        };

        const label = styleText(level.toUpperCase(), levelStyle, options.theme?.reset, options.useColor);

        const timestamp =
            options.showTimestamp && !options.disableTimestamp
                ? styleText(
                    `[${new Date().toISOString()}]`,
                    options.theme?.timestamp,
                    options.theme?.reset,
                    options.useColor
                )
                : '';

        return `${timestamp} ${label}`.trim();
    }

    private renderMessage(message: string, options: LoggerTransportOptions): string {
        return styleText(message, options.theme?.message, options.theme?.reset, options.useColor);
    }

    private renderObject(data: unknown, options: LoggerTransportOptions): string {
        return colorJson(data, options.theme?.json, options.theme?.reset, options.useColor);
    }

    private logWithLevel(level: LogLevel, ...args: unknown[]): void {
        if (!this.shouldLog(level)) return;

        if (!this.transports || this.transports.length === 0) {
            const fallbackOptions: LoggerTransportOptions = {
                useColor: this.useColor,
                theme: this.theme,
                showTimestamp: this.showTimestamp,
                disableTimestamp: this.disableTimestamp,
                minLevel: this.minLevel,
            };

            const prefix = this.formatPrefix(level, fallbackOptions);
            const parts: string[] = [];

            for (const arg of args) {
                if (typeof arg === 'object' && arg !== null) {
                    parts.push(this.renderObject(arg, fallbackOptions));
                } else {
                    parts.push(this.renderMessage(String(arg), fallbackOptions));
                }
            }

            console.log(`${prefix} ${parts.join(' ')}`.trim());
            return;
        }

        for (const transport of this.transports) {
            const mergedOptions: LoggerTransportOptions = {
                useColor: transport.options?.useColor ?? this.useColor,
                theme: transport.options?.theme ?? this.theme,
                showTimestamp: transport.options?.showTimestamp ?? this.showTimestamp,
                disableTimestamp: transport.options?.disableTimestamp ?? this.disableTimestamp,
                minLevel: transport.options?.minLevel ?? this.minLevel
            };

            const prefix = this.formatPrefix(level, mergedOptions);
            const parts: string[] = [];

            for (const arg of args) {
                if (typeof arg === 'object' && arg !== null) {
                    parts.push(this.renderObject(arg, mergedOptions));
                } else {
                    parts.push(this.renderMessage(String(arg), mergedOptions));
                }
            }

            const formatted = `${prefix} ${parts.join(' ')}`.trim();
            transport.log(level, formatted, args, mergedOptions);
        }
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
        process.exit(1);
    }

    shutdown(...args: unknown[]): void {
        this.logWithLevel('info', ...args);
        process.exit(0);
    }

    createLevel(level: LogLevel, style?: AnsiStyle): (...args: unknown[]) => void {
        this.theme.levels[level] = style || { foreground: '\x1b[97m', background: '\x1b[40m' };
        this.enabledLevels.add(level);
        return (...args: unknown[]) => this.logWithLevel(level, ...args);
    }
}