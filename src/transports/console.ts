import { Transport, LogEntry } from "../logger";

export class ConsoleTransport implements Transport {
    log(entry: LogEntry): void {
        let prefix = "";
        if (entry.loggerName) prefix += `[${entry.loggerName}] `;
        prefix += "[" + entry.timestamp + "] "
        prefix += "[" + entry.level.toUpperCase() + "]";

        if (entry.level === "DEBUG") {
            const objIndex = entry.data.findIndex((d) => typeof d === "object");
            if (objIndex >= 0) {
                const before = entry.data.slice(0, objIndex);
                const after = entry.data.slice(objIndex);
                console.log(prefix, ...before);
                for (const data of after) {
                    if (typeof data === "object") console.dir(data, { depth: null });
                    else console.log(data);
                }
                console.log("[DEBUG];");
            } else {
                console.log(prefix, ...entry.data);
            }
        } else
            console.log(prefix, ...entry.data);
    }
}
