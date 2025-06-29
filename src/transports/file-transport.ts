import { appendFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { LoggerTransport, LoggerTransportOptions, LogLevel } from '../types';
import { transportFactory } from '../utils';


export function FileTransport(logDir: string): LoggerTransport {
    if (!logDir) {
        throw new Error('Log directory must be provided for FileTransport');
    }

    if (!existsSync(logDir)) {
        mkdirSync(logDir, { recursive: true });
    }

    return transportFactory(
        { useColor: false },
        (_level: LogLevel, message: string, _args: unknown[], _opts?: LoggerTransportOptions) => {
            const date = new Date().toISOString().split('T')[0];
            const filePath = join(logDir, `${date}.log`);
            appendFileSync(filePath, message + '\n', { encoding: 'utf-8' });
        }
    );
}

