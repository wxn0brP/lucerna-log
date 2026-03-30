import { ConsoleTransport } from "./transports/console.js";
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
export class Logger {
    transports;
    loggerName;
    logLevel;
    constructor(options = {}) {
        this.transports = options.transports ?? [new ConsoleTransport()],
            this.loggerName = options.loggerName ?? "";
        if (options.logLevel) {
            const logLevel = options.logLevel.toUpperCase();
            if (typeof LogLevel[logLevel] === "number")
                this.logLevel = LogLevel[logLevel];
            else
                this.logLevel = LogLevel.ERROR;
        }
        else
            this.logLevel = LogLevel.ERROR;
    }
    createEntry(level, any) {
        return {
            level,
            timestamp: new Date().toISOString(),
            data: any,
            loggerName: this.loggerName
        };
    }
    async log(level, any) {
        if (level > this.logLevel)
            return;
        const entry = this.createEntry(LogLevel[level], any);
        for (const transport of this.transports) {
            await transport.log(entry);
        }
    }
    debug(...any) {
        return this.log(LogLevel.DEBUG, any);
    }
    info(...any) {
        return this.log(LogLevel.INFO, any);
    }
    warn(...any) {
        return this.log(LogLevel.WARN, any);
    }
    error(...any) {
        return this.log(LogLevel.ERROR, any);
    }
}
