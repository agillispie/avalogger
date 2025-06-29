import type { LoggerTransportOptions, LogLevel, LoggerTransport } from ".";

type TransportFactory = (
    options: Partial<LoggerTransportOptions>,
    logFn: (
        level: LogLevel,
        formattedMessage: string,
        rawArgs: unknown[],
        options: LoggerTransportOptions
    ) => void
) => LoggerTransport;