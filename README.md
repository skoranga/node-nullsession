node-nullsession
================

/dev/null equivalent for connect-session. For usecases where you are forced to have some session aware app but no session is required. Disable session in express app without worrying about other middlewares or session aware modules by using `nullsession`.

### How to use

Add following dependencies in your package.json

```json
    "express-session": "^1.9",
    "nullsession": "~0.2.0",

```

In index.js (or equivalent)

```js
var session = require('express-session'),
    NullStore = require('nullsession/middleware')(session);

express().use(session({
    store: new NullStore(),
    secret: 'keyboard cat'
    }));
```
