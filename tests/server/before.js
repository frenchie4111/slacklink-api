/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var model_before = require( '../models/before' );

    var server = require( '../../app' );

    var _error_trusts = {
        404: {
            error: {
                type: 'number',
                value: 404
            },
            message: {
                type: 'string'
            }
        }
    };

    beforeEach( function *() {
        yield model_before.clearModels();
        yield server.start();
        global.test_util.trust = require( 'trust-rest-then' )( 'http://localhost:' + test_util.config.port );
        global.test_util.request = require( 'request' );
        global.error_trusts = _error_trusts;
    } );

    afterEach( function *() {
        yield server.stop();
        delete global.error_trusts;
    } );
} )();
