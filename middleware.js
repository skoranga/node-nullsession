'use strict';

const session = require('express-session');
const NullStore = require('./index')(session);

module.exports = function (settings) {
    settings = settings || {};
    settings.resave = false;
    settings.secret = 'cat';
    settings.saveUninitialized = false;
    settings.genid = function () {
        return undefined;
    };
    settings.store = new NullStore(settings);
    return session(settings);
};
