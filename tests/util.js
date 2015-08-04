/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    // Do this before mocha-directory, so that tests can see it
    global.test_util = {};
    global.test_util.assert = require( 'chai' ).assert;
    global.test_util.q = require( 'q' );
    global.test_util._ = require( 'underscore' );
    global.test_util.lodash = require( 'lodash' );

    require( 'mocha-runnable-generators' );
    require( 'mocha-directory' )();

    var config = require( '../config' );

    global.test_util.config = config;

    before( function setupEnv() {
        config.env = process.env.NODE_ENV = 'test';
        config.port = process.env.PORT = 1338;
    } );

    before( function() {

    } );
} )();
