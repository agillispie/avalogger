# AvaLogger

```typescript
import { AvaLogger } from 'avalogger'

const logger = new AvaLogger()

logger.log("Some message", "Some other message", {some: "json"})

logger.fatal("This was a bad error");

logger.exit("I will execute process.exit(0) after I log my message")
```

### DOCS TBA