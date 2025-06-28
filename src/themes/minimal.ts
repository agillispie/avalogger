import { FullLoggerTheme } from "../types";

const minimalTheme: FullLoggerTheme = {
    reset: '\x1b[0m',
    json: {
        key: { foreground: '\x1b[0m' },
        string: { foreground: '\x1b[0m' },
        number: { foreground: '\x1b[0m' },
        boolean: { foreground: '\x1b[0m' },
        null: { foreground: '\x1b[0m' },
    },
    levels: {
        info: { foreground: '\x1b[0m' },
        fatal: { foreground: '\x1b[1m', background: '\x1b[41m' },
        warn: { foreground: '\x1b[33m' },
        debug: { foreground: '\x1b[90m' },
    },
    timestamp: { foreground: '\x1b[90m' },
    message: { foreground: '\x1b[0m' },
};

export { minimalTheme };