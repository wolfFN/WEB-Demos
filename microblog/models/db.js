/**
 * Created by wjzhang on 6/25/17.
 */
var settings = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(
    settings.db,
    new Server(
        settings.host,
        Connection.DEFAULT_PORT,
        {}
    )
);