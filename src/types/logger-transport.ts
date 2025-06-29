import type { FullLoggerTheme, LogLevel } from ".";

export interface LoggerTransportOptions {
    useColor: boolean;
    theme: FullLoggerTheme;
    showTimestamp: boolean;
    disableTimestamp: boolean;
    minLevel: LogLevel;
}

export interface LoggerTransport {
    options?: Partial<LoggerTransportOptions>; // optional per-transport overrides

    log: (
        level: LogLevel,
        formattedMessage: string,
        rawArgs: unknown[],
        options?: LoggerTransportOptions
    ) => void;
}