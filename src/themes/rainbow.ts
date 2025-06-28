import type { FullLoggerTheme } from "../types";

const rainbowTheme: FullLoggerTheme = {
    reset: '\x1b[0m',
    json: {
        key: { foreground: '\x1b[31m' },     // red
        string: { foreground: '\x1b[33m' },  // yellow
        number: { foreground: '\x1b[32m' },  // green
        boolean: { foreground: '\x1b[34m' }, // blue
        null: { foreground: '\x1b[35m' },    // magenta
    },
    levels: {
        info: { foreground: '\x1b[31m', background: '\x1b[43m' },
        fatal: { foreground: '\x1b[35m', background: '\x1b[41m' },
        warn: { foreground: '\x1b[33m', background: '\x1b[44m' },
        debug: { foreground: '\x1b[36m', background: '\x1b[45m' },
    },
    timestamp: { foreground: '\x1b[95m' },
    message: { foreground: '\x1b[37m' },
};

export { rainbowTheme };