'use strict';

var path = require('path'),
    assert = require('assert'),
    session = require('express-session'),
    NullStore = require('../index')(session);


describe('nullsession', function () {

    var store = new NullStore();

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
            assert.deepEqual({}, data);
            next();
        });
    });


    it('should get a empty value for non key as well', function (next) {
        store.get('akeythatdoesntexist', function (err, data) {
            assert.ok(!err, '#get() got an error');
            assert.deepEqual({}, data);
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
