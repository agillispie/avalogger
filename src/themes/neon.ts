import type { FullLoggerTheme } from "../types";

const neonTheme: FullLoggerTheme = {
    reset: '\x1b[0m',
    json: {
        key: { foreground: '\x1b[96m' },     // bright cyan
        string: { foreground: '\x1b[92m' },  // bright green
        number: { foreground: '\x1b[93m' },  // bright yellow
        boolean: { foreground: '\x1b[95m' }, // bright magenta
        null: { foreground: '\x1b[90m' },    // gray
    },
    levels: {
        info: { foreground: '\x1b[30m', background: '\x1b[102m' },
        fatal: { foreground: '\x1b[30m', background: '\x1b[101m' },
        warn: { foreground: '\x1b[30m', background: '\x1b[103m' },
        debug: { foreground: '\x1b[30m', background: '\x1b[104m' },
    },
    timestamp: { foreground: '\x1b[96m' },
    message: { foreground: '\x1b[97m' },
};

export { neonTheme }