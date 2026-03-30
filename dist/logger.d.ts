export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3
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
export declare class Logger {
    transports: Transport[];
    loggerName: string;
    logLevel: LogLevel;
    constructor(options?: LoggerOptions);
    private createEntry;
    private log;
    debug(...any: any[]): Promise<void>;
    info(...any: any[]): Promise<void>;
    warn(...any: any[]): Promise<void>;
    error(...any: any[]): Promise<void>;
}
