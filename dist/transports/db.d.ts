import { ValtheraCompatible } from "@wxn0brp/db-core";
import { Transport, LogEntry } from "../logger.js";
export declare class ValtheraDBTransport implements Transport {
    db: ValtheraCompatible;
    collection: string;
    constructor(db: ValtheraCompatible, collection?: string);
    log(entry: LogEntry): Promise<void>;
}
