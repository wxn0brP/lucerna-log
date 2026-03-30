import { appendFileSync, mkdirSync } from "fs";
import { dirname } from "path";
export class FileTransport {
    filePath;
    constructor(filePath = "./logs.txt") {
        this.filePath = filePath;
        mkdirSync(dirname(this.filePath), { recursive: true });
    }
    log(entry) {
        let prefix = "";
        if (entry.loggerName)
            prefix += `[${entry.loggerName}] `;
        prefix += "[" + entry.timestamp + "] ";
        prefix += "[" + entry.level.toUpperCase() + "]";
        const logLine = `${prefix} ${entry.data.map((d) => typeof d === "object" ? JSON.stringify(d) : d.toString()).join(" ")}\n`;
        appendFileSync(this.filePath, logLine);
    }
}
