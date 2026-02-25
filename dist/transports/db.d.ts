import { ValtheraCompatible } from "@wxn0brp/db-core";
import { Transport, LogEntry } from "../logger.js";
import { Collection } from "@wxn0brp/db-core/helpers/collection";
export declare class ValtheraDBTransport implements Transport {
    db: ValtheraCompatible;
    collection: string;
    c: Collection;
    constructor(db: ValtheraCompatible, collection?: string);
    log(entry: LogEntry): Promise<void>;
}
