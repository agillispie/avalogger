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

## Creating Custom Themes with RGB Customizer

AvaLogger allows you to create custom themes using RGB values for precise color customization. Here's how you can do it:

### Using the RGB Customizer

1. **Generate ANSI Codes**: Use the `generateAnsiFromRgb` utility to create ANSI escape codes for your desired RGB colors.

```typescript
import { generateAnsiFromRgb } from 'avalogger';

const myTheme = {
  log: { foreground: generateAnsiFromRgb(0, 128, 255) }, // Blue text
  info: { foreground: generateAnsiFromRgb(0, 255, 0) },  // Green text
  warn: { foreground: generateAnsiFromRgb(255, 255, 0) }, // Yellow text
  error: { foreground: generateAnsiFromRgb(255, 0, 0) }, // Red text
  fatal: { foreground: generateAnsiFromRgb(255, 255, 255), background: generateAnsiFromRgb(128, 0, 0) }, // White on dark red
};

export default myTheme;
```

2. **Apply the Theme**: Import and use your custom theme as shown in the earlier example.

```typescript
import { AvaLogger } from 'avalogger';
import myTheme from './themes/my-theme';

const logger = new AvaLogger({ theme: myTheme });
logger.log("This is a log message with my custom RGB theme");
```

## Creating Custom Transports

AvaLogger supports custom transports for logging to different destinations. Here's how you can create one:

### Example: Custom HTTP Transport

1. **Define the Transport**: Create a function that implements the `LoggerTransport` interface.

```typescript
import { LoggerTransport, transportFactory } from 'avalogger';
import axios from 'axios';

function HttpTransport(endpoint: string): LoggerTransport {
  return transportFactory(
    { useColor: false },
    async (level, message, _args, _opts) => {
      await axios.post(endpoint, { level, message });
    }
  );
}

export default HttpTransport;
```

2. **Use the Transport**: Add the custom transport to the `AvaLogger` instance.

```typescript
import { AvaLogger } from 'avalogger';
import HttpTransport from './transports/http-transport';

const logger = new AvaLogger({
  transports: [HttpTransport('https://example.com/logs')],
});

logger.info("This message will be sent to the HTTP endpoint");
```

## Configuration

AvaLogger provides a flexible configuration system to customize its behavior. You can pass an options object to the `AvaLogger` constructor.

### Available Options

- **theme**: The theme to use for logging. Accepts a `FullLoggerTheme` object. If not provided, the default theme is used.
- **disableColor**: A boolean to disable colored output. Defaults to `false`.
- **showTimestamp**: A boolean to include timestamps in log messages. Defaults to `true`.
- **disableTimestamp**: A boolean to disable timestamps in log messages. Defaults to `false`.
- **minLevel**: The minimum log level to display. Messages below this level will be ignored. Defaults to `'debug'`.
- **enabledLevels**: An array of log levels to enable. If not provided, all levels defined in the theme are enabled.
- **transports**: An array of custom transports to use for logging. If not provided, logs are output to the console.

### Example Configuration

```typescript
import { AvaLogger } from 'avalogger';
import myTheme from './themes/my-theme';

const logger = new AvaLogger({
  theme: myTheme, // Custom theme
  disableColor: false, // Enable colored output
  showTimestamp: true, // Include timestamps
  disableTimestamp: false, // Do not disable timestamps
  minLevel: 'info', // Only log 'info' and higher levels
  enabledLevels: ['info', 'warn', 'error'], // Enable specific levels
  transports: [], // Use default console transport
});

logger.info("This is an info message");
logger.debug("This debug message will not be shown because the log level is set to 'info'");
```