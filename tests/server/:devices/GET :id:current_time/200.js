/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    it( 'standard', function *() {
        yield test_util.trust( {
            path: '/devices/1/current_time',
            method: 'get'
        }, {
            body: {
                current_time: {
                    type: 'number'
                }
            }
        } );
    } );
} )();
