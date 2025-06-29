import type { FullLoggerTheme, LogLevel, LoggerTransport } from "./index";

interface LoggerOptions {
    theme?: Partial<FullLoggerTheme>;
    disableColor?: boolean;
    showTimestamp?: boolean;
    disableTimestamp?: boolean;
    minLevel?: LogLevel;
    enabledLevels?: LogLevel[];
    transports?: LoggerTransport[];
}

export type { LoggerOptions };