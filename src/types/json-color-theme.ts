import { AnsiStyle } from "./ansi-style";

type JsonColorTheme = {
    key: AnsiStyle;
    string: AnsiStyle;
    number: AnsiStyle;
    boolean: AnsiStyle;
    null: AnsiStyle;
};

export type { JsonColorTheme };