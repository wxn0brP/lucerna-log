# @wxn0brp/lucerna-log

A lightweight, modular logging utility for TypeScript/JavaScript with pluggable transport support.  
Designed to be simple, extensible, and dependency-free — ideal for projects where existing logging libraries are too complex or too heavy.

## Installation

```bash
npm install @wxn0brp/lucerna-log
```

## Features

* Minimal core (\~5 files)
* Built-in transports: **console**, **file**, **ValtheraDB**
* Fully extensible transport system
* Structured log entries with metadata support
* Works in any Node.js or server-side environment
* No runtime dependencies (except peer deps for optional transports)

## DOCS

See [docs](https://wxn0brp.github.io/lucerna-log/).

## Quick Start

```ts
import { Logger, ConsoleTransport } from "@wxn0brp/lucerna-log";

const shortLogger = new Logger();
const logger = new Logger({
  transports: [new ConsoleTransport()],
  loggerName: "AuthService",
  logLevel: "debug"
});

logger.info("User logged in", { userId: 123 });
logger.warn("JWT expiring soon");
logger.error("Token invalid", { token: "..." });
logger.dd({ rawRequest });
```

## Logger API

### Constructor

```ts
new Logger({
  transports?: Transport[],                      
  loggerName?: string,                           
  logLevel?: LogLevelName | Lowercase<LogLevelName> 
})
```

### Logging Methods

```ts
logger.debug("Debug message", { extra: "data" });
logger.info("Something informative");
logger.warn("Potential issue");
logger.error("An error occurred", { code: 500 });
```

### Debug Dump

```ts
logger.dd(obj1, obj2, "anything else");
// Passthrough to transport.debug(...)
```

## Built-in Transports

### `ConsoleTransport` (default)

Logs to `console.log` using structured JSON format:

* `timestamp`
* `level`
* `loggerName`
* `message`
* optional `meta`

### `FileTransport`

Writes logs to a file (default: `logs.txt`), in one-line JSON entries per log.
Supports async writing with batching (optional).

```ts
new FileTransport("./logs.txt");
```

### `ValtheraTransport`

Stores logs directly in a **ValtheraDB** collection.

```ts
new ValtheraDBTransport(
    db: Valthera | ValtheraRemote,
    collection: string = "logs"
)
```

## Custom Transport Interface

You can define your own transport by implementing:

```ts
interface Transport {
  log(entry: LogEntry): void | Promise<void>;
  debug(entry: LogEntry, ...any: any): void | Promise<void>;
}
```

## Log Levels

| Level | Value |
| ----- | ----- |
| DEBUG | `0`   |
| INFO  | `1`   |
| WARN  | `2`   |
| ERROR | `3`   |

Logging below the configured threshold will be ignored.

## Design Principles

* Clear separation: logger vs output handling
* Extendable with minimal overhead
* Focused on log structure, not formatting
* Suitable for microservices, CLIs, and embedded runtimes

## License

MIT [License](LICENSE)

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.