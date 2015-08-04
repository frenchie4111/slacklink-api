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
            path: '/users'
        }, {
            code: 200,
            type: 'array',
            body: {}
        } );
    } );
} )();
