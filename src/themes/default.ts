import { FullLoggerTheme } from "../types";

const defaultTheme: FullLoggerTheme = {
    reset: '\x1b[0m',
    json: {
        key: { foreground: '\x1b[36m' },     // cyan
        string: { foreground: '\x1b[33m' },  // yellow
        number: { foreground: '\x1b[32m' },  // green
        boolean: { foreground: '\x1b[35m' }, // magenta
        null: { foreground: '\x1b[90m' },    // gray
    },
    levels: {
        info: { foreground: '\x1b[97m', background: '\x1b[44m' },  // white on blue
        fatal: { foreground: '\x1b[97m', background: '\x1b[41m' },  // white on red
        warn: { foreground: '\x1b[30m', background: '\x1b[43m' },   // black on yellow
        debug: { foreground: '\x1b[97m', background: '\x1b[45m' },  // white on magenta
    },
    timestamp: { foreground: '\x1b[38;5;208m' }, // orange
    message: { foreground: '\x1b[37m' }, // light gray
};

export { defaultTheme };