import { appendFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { LogEntry, Transport } from "../logger";

export class FileTransport implements Transport {
    constructor(private filePath: string = "./logs.txt") {
        mkdirSync(dirname(this.filePath), { recursive: true });
    }

    log(entry: LogEntry) {
        let prefix = "";
        if (entry.loggerName) prefix += `[${entry.loggerName}] `;
        prefix += "[" + entry.timestamp + "] "
        prefix += "[" + entry.level.toUpperCase() + "]";

        const logLine = `${prefix} ${entry.data.map((d) => typeof d === "object" ? JSON.stringify(d) : d.toString()).join(" ")}\n`;
        appendFileSync(this.filePath, logLine);
    }
}
