import { ValtheraCompatible } from "@wxn0brp/db-core";
import { Transport, LogEntry } from "../logger";

export class ValtheraDBTransport implements Transport {
    constructor(
        public db: ValtheraCompatible,
        public collection = "logs"
    ) { }

    async log(entry: LogEntry): Promise<void> {
        await this.db.add(this.collection, entry);
    }
}
