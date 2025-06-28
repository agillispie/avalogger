import { JsonColorTheme } from "../types";
import { styleText } from "./style-text";

function colorJson(input: unknown, theme: JsonColorTheme, reset: string, useColor: boolean): string {
    let json = JSON.stringify(input, null, 2);
    json = json.replace(
        /\[\n((\s{2,})[^{}\[\]\n]+,\n)+\s{2,}[^{}\[\]\n]+\n\s*\]/g,
        (block) => {
            const items = block
                .split('\n')
                .map((line) => line.trim().replace(/,$/, ''))
                .filter(Boolean);
            return `[${items.join(', ')}]`;
        }
    );
    if (!useColor) return json;
    return json.replace(
        /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b\d+(\.\d+)?\b|\btrue\b|\bfalse\b|\bnull\b)/g,
        (match) => {
            if (/^"/.test(match)) {
                return /:$/.test(match)
                    ? styleText(match, theme.key, reset, useColor)
                    : styleText(match, theme.string, reset, useColor);
            } else if (/^\d+(\.\d+)?$/.test(match)) {
                return styleText(match, theme.number, reset, useColor);
            } else if (match === 'true' || match === 'false') {
                return styleText(match, theme.boolean, reset, useColor);
            } else if (match === 'null') {
                return styleText(match, theme.null, reset, useColor);
            }
            return match;
        }
    );
}

export { colorJson };