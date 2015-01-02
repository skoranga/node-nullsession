'use strict';

var util = require('util');

module.exports = function ConnectNullStore(app) {

    /**
     * Express's session store
     */
    var Store = app.Store || app.session.Store;

    function NullStore(options) {
        options = options || {};

        NullStore.super_.call(this, options);
    }

    util.inherits(NullStore, Store);

    /**
     * Gets session data
     * @param id
     * @param callback
     */
    NullStore.prototype.get = function get(id, callback) {
        //return empty object
        callback(null, {});
    };


    /**
     * Sets or updates a session
     * @param id
     * @param session
     * @param callback
     */
    NullStore.prototype.set = function set(id, session, callback) {
        //return empty object
        callback(null, {});
    };


    /**
     * Invalidates a session
     * @param id
     * @param callback
     */
    NullStore.prototype.destroy = function destroy(id, callback) {
        callback(null, {});
    };


    return NullStore;
};