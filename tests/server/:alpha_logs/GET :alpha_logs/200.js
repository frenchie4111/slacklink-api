/* global log_trust */
/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    it( 'valid, empty', function *() {
        yield test_util.trust( {
            method: 'get',
            path: '/log'
        }, {
            code: 200,
            type: 'array',
            body: {}
        } );
    } );

    it( 'valid', function *() {
        yield test_util.trust( {
            method: 'get',
            path: '/log'
        }, {
            code: 200,
            type: 'array',
            body: log_trust
        } );
    } );
} )();
