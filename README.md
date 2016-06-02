# Find-port

Open port finder with Promise interface.

```javascript
const findPort = require('@risingstack/find-port')

const start = 1024
const end = 2048 // 65535 by default

findPort(start, end)
  .then((port) => console.log('Port is open:', port))
  .catch((error) => console.error(error))
```

## Installation

```
npm install @risingstack/find-port --save
```
