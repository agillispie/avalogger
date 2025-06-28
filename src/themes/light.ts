import { FullLoggerTheme } from "../types";

const lightTheme: FullLoggerTheme = {
    reset: '\x1b[0m',
    json: {
        key: { foreground: '\x1b[34m' },
        string: { foreground: '\x1b[32m' },
        number: { foreground: '\x1b[31m' },
        boolean: { foreground: '\x1b[35m' },
        null: { foreground: '\x1b[90m' },
    },
    levels: {
        info: { foreground: '\x1b[30m', background: '\x1b[47m' },
        fatal: { foreground: '\x1b[97m', background: '\x1b[41m' },
        warn: { foreground: '\x1b[30m', background: '\x1b[43m' },
        debug: { foreground: '\x1b[30m', background: '\x1b[46m' },
    },
    timestamp: { foreground: '\x1b[33m' },
    message: { foreground: '\x1b[30m' },
};

export { lightTheme };