import type { LoggerTransport, LoggerTransportOptions, LogLevel } from "../types";
import { transportFactory } from "../utils";

function ConsoleTransport(): LoggerTransport {
    return transportFactory(
        { useColor: true },
        (_level: LogLevel, message: string, _args: unknown[], _opts?: LoggerTransportOptions) => {
            console.log(message)
        }
    );
}

export { ConsoleTransport };