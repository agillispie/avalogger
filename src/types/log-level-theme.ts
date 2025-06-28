import { LogLevel } from "./log-level";
import { AnsiStyle } from "./ansi-style";

type LogLevelTheme = Record<LogLevel, AnsiStyle>;

export type { LogLevelTheme };