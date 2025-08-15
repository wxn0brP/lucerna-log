import { ConsoleTransport } from "./transports/console";

export enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG
}
export type LogLevelName = keyof typeof LogLevel;
export type LogLevelNameLowerCase = Lowercase<LogLevelName>;

export interface LogEntry {
    level: LogLevelName;
    data: any[];
    timestamp: string;
    loggerName?: string;
}

export interface LoggerOptions {
    transports?: Transport[];
    loggerName?: string;
    logLevel?: LogLevelName | LogLevelNameLowerCase;
}

export interface Transport {
    log(entry: LogEntry): Promise<void> | void;
}

export class Logger {
    transports: Transport[]
    loggerName: string
    public logLevel: LogLevel

    constructor(options: LoggerOptions = {}) {
        this.transports = options.transports ?? [new ConsoleTransport()],
            this.loggerName = options.loggerName ?? "";
        if (options.logLevel) {
            const logLevel = options.logLevel.toUpperCase() as LogLevelName;
            if (typeof LogLevel[logLevel] === "number") this.logLevel = LogLevel[logLevel];
            else this.logLevel = LogLevel.ERROR;
        }
        else this.logLevel = LogLevel.ERROR;
    }

    private createEntry(level: LogLevelName, any: any[]): LogEntry {
        return {
            level,
            timestamp: new Date().toISOString(),
            data: any,
            loggerName: this.loggerName
        }
    }

    private async log(level: LogLevel, any: any[]) {
        if (level > this.logLevel) return;

        const entry = this.createEntry(LogLevel[level] as any, any);
        for (const transport of this.transports) {
            await transport.log(entry);
        }
    }

    debug(...any: any[]) {
        return this.log(LogLevel.DEBUG, any);
    }

    info(...any: any[]) {
        return this.log(LogLevel.INFO, any);
    }

    warn(...any: any[]) {
        return this.log(LogLevel.WARN, any);
    }

    error(...any: any[]) {
        return this.log(LogLevel.ERROR, any);
    }
}