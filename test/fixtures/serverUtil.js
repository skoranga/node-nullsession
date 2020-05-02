"use strict";

const http = require('http');
const assert = require('assert');
const session = require('../../middleware');

// copied from https://github.com/expressjs/session/blob/master/test/session.js

function cookie(res) {
    var setCookie = res.headers['set-cookie'];
    return (setCookie && setCookie[0]) || undefined;
}

function shouldHaveNoCookie (name) {
    return function (res) {
        var cookieHeaders = cookie(res);
        assert.ok(!cookieHeaders, 'should not have a cookie header');
    };
}

function createServer (options, respond) {
    var fn = respond;
    var opts = options;
    var server = http.createServer();

    // setup, options, respond
    if (typeof arguments[0] === 'function') {
      opts = arguments[1];
      fn = arguments[2];

      server.on('request', arguments[0]);
    }

    return server.on('request', createRequestListener(opts, fn));
  }

  function createRequestListener(opts, fn) {
    var _session = createSession(opts);
    var respond = fn || end;

    return function onRequest(req, res) {
      var server = this;
      _session(req, res, function (err) {
        if (err && !res._header) {
          res.statusCode = err.status || 500;
          res.end(err.message);
          return;
        }

        if (err) {
          server.emit('error', err);
          return;
        }

        respond(req, res);
      });
    };
  }

  function createSession(opts) {
    var options = opts || {};
    return session(options);
  }

  function end(req, res) {
    res.end();
  }

module.exports = {
    createServer,
    shouldHaveNoCookie
};