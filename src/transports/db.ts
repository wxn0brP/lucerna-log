import { ValtheraCompatible } from "@wxn0brp/db-core";
import { Transport, LogEntry } from "../logger";
import { Collection } from "@wxn0brp/db-core/helpers/collection";

export class ValtheraDBTransport implements Transport {
    c: Collection;
    constructor(
        public db: ValtheraCompatible,
        public collection = "logs"
    ) {
        this.c = db.c(collection);
    }

    async log(entry: LogEntry): Promise<void> {
        await this.c.add(entry);
    }
}
