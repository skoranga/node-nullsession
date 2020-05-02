'use strict';

const path = require('path');
const assert = require('assert');
const request = require('supertest');
const session = require('express-session');
const NullStore = require('../index')(session);
const serverUtil = require('./fixtures/serverUtil');

const emptySession = {
    cookie: {
        httpOnly: true,
        maxAge: null,
        path: "/"
    }
};

describe('nullsession', function () {

    const store = new NullStore();

    it('should set a value', function (next) {
        store.set('session_test', { cookie: { maxAge: 2000 }, name: 'foo' }, function (err, data) {
            assert.ok(!err, '#set() got an error');
            assert.ok(data, '#set() is not ok');
            next();
        });
    });


    it('should get a value', function (next) {
        store.get('session_test', function (err, data) {
            assert.ok(!err, '#get() got an error');
            assert.deepEqual(emptySession, data);
            next();
        });
    });


    it('should get a empty value for non key as well', function (next) {
        store.get('akeythatdoesntexist', function (err, data) {
            assert.ok(!err, '#get() got an error');
            assert.deepEqual(emptySession, data);
            next();
        });
    });


    it('should destroy a session', function (next) {
        store.destroy('session_test', function (err, ok) {
            assert.ok(!err, '#destroy() got an error');
            assert.ok(ok, '#destroy() is not ok');
            next();
        });
    });
});

describe('no cookie nullsession on server', function () {

    it('should not create a new cookie', function (done) {
      var count = 0;
      var server = serverUtil.createServer({}, function (req, res) {
        req.session.num = req.session.num || ++count;
        res.end('data');
      });

      request(server)
      .get('/')
      .expect(serverUtil.shouldHaveNoCookie())
      .expect(200, 'data', done);
    });
  });
