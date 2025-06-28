# AvaLogger

AvaLogger is a lightweight and customizable logging library for Node.js and TypeScript. It provides a simple API for logging messages with various log levels, JSON formatting, and customizable themes.

## Features

- **Multiple Log Levels**: Supports `log`, `info`, `warn`, `error`, `fatal`, and more.
- **Customizable Themes**: Choose from built-in themes or create your own.
- **JSON Support**: Log JSON objects with ease.
- **Process Control**: Includes methods like `exit` for controlled application termination.

## Installation

Install AvaLogger via npm:

```bash
npm install avalogger
```

Or with yarn:

```bash
yarn add avalogger
```

## Usage

Here’s a quick example to get started:

```typescript
import { AvaLogger } from 'avalogger';

const logger = new AvaLogger();

// Log messages
logger.log("Some message", "Some other message", { some: "json" });

// Log a fatal error
logger.fatal("This was a bad error");

// Exit the process after logging a message
logger.exit("I will execute process.exit(0) after I log my message");
```

## Themes

AvaLogger comes with several built-in themes, including:

- `default`
- `light`
- `minimal`
- `neon`
- `pink`
- `rainbow`

You can also create your own custom themes to match your application's style.

## Creating and Applying Custom Themes

AvaLogger allows you to create and apply custom themes to match your application's style. Here's how you can do it:

### Creating a Custom Theme

1. **Define Your Theme**: Create a new theme file (e.g., `my-theme.ts`) and export an object that adheres to the `FullLoggerTheme` interface.

```typescript
import { FullLoggerTheme } from 'avalogger';

const myTheme: FullLoggerTheme = {
  log: { color: 'blue', background: 'white', style: 'bold' },
  info: { color: 'green' },
  warn: { color: 'yellow', style: 'italic' },
  error: { color: 'red', background: 'black', style: 'bold' },
  fatal: { color: 'white', background: 'red', style: 'bold' },
};

export default myTheme;
```

2. **Save the File**: Place the file in your project directory, preferably in a `themes/` folder.

### Applying a Custom Theme

1. **Import the Theme**: Import your custom theme into your project.

```typescript
import { AvaLogger } from 'avalogger';
import myTheme from './themes/my-theme';
```

2. **Apply the Theme**: Pass the theme to the `AvaLogger` constructor.

```typescript
const logger = new AvaLogger({ theme: myTheme });

logger.log("This is a log message with my custom theme");
```

## Configuration

AvaLogger provides a flexible configuration system to customize its behavior. You can pass an options object to the `AvaLogger` constructor.

### Available Options

- **theme**: The theme to use for logging. Accepts a `FullLoggerTheme` object.
- **logLevel**: The minimum log level to display. Messages below this level will be ignored.
- **jsonColorTheme**: Customize how JSON objects are styled when logged.

### Example Configuration

```typescript
import { AvaLogger } from 'avalogger';
import myTheme from './themes/my-theme';

const logger = new AvaLogger({
  theme: myTheme,
  logLevel: 'info',
  jsonColorTheme: {
    key: 'cyan',
    value: 'magenta',
    string: 'green',
    number: 'yellow',
  },
});

logger.info("This is an info message");
logger.debug("This debug message will not be shown because the log level is set to 'info'");
```