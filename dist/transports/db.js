export class ValtheraDBTransport {
    db;
    collection;
    c;
    constructor(db, collection = "logs") {
        this.db = db;
        this.collection = collection;
        this.c = db.c(collection);
    }
    async log(entry) {
        await this.c.add(entry);
    }
}
