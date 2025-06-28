import { FullLoggerTheme } from "./full-logger-theme";
import { LogLevel } from "./log-level";

interface LoggerOptions {
    theme?: Partial<FullLoggerTheme>;
    disableColor?: boolean;
    showTimestamp?: boolean;
    disableTimestamp?: boolean;
    minLevel?: LogLevel;
    enabledLevels?: LogLevel[];
}

export type { LoggerOptions };