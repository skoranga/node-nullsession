'use strict';

var session = require('express-session'),
    NullStore = require('./index')(session);

module.exports = function (settings) {
    settings.store = new NullStore(settings);
    return session(settings);
};