/**
 * Returns ANSI escape code for a given RGB color.
 * Works for foreground or background based on `isBackground`.
 * 
 * @param r Red (0-255)
 * @param g Green (0-255)
 * @param b Blue (0-255)
 * @param isBackground If true, returns background color. Defaults to false.
 * @returns ANSI escape string
 */
export function generateAnsiFromRgb(r: number, g: number, b: number, isBackground: boolean = false): string {
    if (![r, g, b].every((c) => Number.isInteger(c) && c >= 0 && c <= 255)) {
        throw new Error('RGB values must be integers between 0 and 255');
    }

    return `\x1b[${isBackground ? 48 : 38};2;${r};${g};${b}m`;
}