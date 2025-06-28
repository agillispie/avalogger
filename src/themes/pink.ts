import type { FullLoggerTheme } from "../types";

const pinkTheme: FullLoggerTheme = {
    reset: '\x1b[0m',
    json: {
        key: { foreground: '\x1b[35m' },
        string: { foreground: '\x1b[95m' },
        number: { foreground: '\x1b[95m' },
        boolean: { foreground: '\x1b[35m' },
        null: { foreground: '\x1b[90m' },
    },
    levels: {
        info: { foreground: '\x1b[97m', background: '\x1b[105m' },
        fatal: { foreground: '\x1b[97m', background: '\x1b[41m' },
        warn: { foreground: '\x1b[30m', background: '\x1b[105m' },
        debug: { foreground: '\x1b[30m', background: '\x1b[95m' },
    },
    timestamp: { foreground: '\x1b[95m' },
    message: { foreground: '\x1b[95m' },
};

export { pinkTheme };