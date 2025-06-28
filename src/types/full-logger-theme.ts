import { JsonColorTheme } from "./json-color-theme";
import { LogLevelTheme } from "./log-level-theme";
import { AnsiStyle } from "./ansi-style";

type FullLoggerTheme = {
    json: JsonColorTheme;
    levels: LogLevelTheme;
    reset: string;
    message: AnsiStyle;
    timestamp: AnsiStyle;
};


export type { FullLoggerTheme }