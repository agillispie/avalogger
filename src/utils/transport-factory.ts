import type { LoggerTransportOptions, LoggerTransport } from "../types";

function transportFactory(
    overrides: Partial<LoggerTransportOptions>,
    log: LoggerTransport['log']
): LoggerTransport {
    return {
        options: overrides,
        log
    };
}

export { transportFactory };