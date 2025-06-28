import { AnsiStyle } from "../types";

function styleText(text: string, style: AnsiStyle, reset: string, useColor: boolean): string {
    return useColor ? `${style.background ?? ''}${style.foreground}${text}${reset}` : text;
}

export { styleText };