node-nullsession
================

/dev/null equivalent for connect-session. If app is not using session, disable session in express app by using `nullsession` module.


### How to use

Add following dependencies in your package.json

```
    "express-session": "^1.9",
    "nullsession": "~0.1.0",

```

In index.js (or equivalent)

```
var session = require('express-session'),
    NullStore = require('nullsession/middleware')(session);

express().use(session({
    store: new NullStore(),
    secret: 'keyboard cat'
    }));
```
