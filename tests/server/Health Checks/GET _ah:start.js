/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    it( 'GET _ah/start', function *() {
        yield new test_util.q
            .Promise( function( resolve ) {
                test_util.request
                    .get( 'http://localhost:1338/_ah/start' )
                    .on( 'response', function( response ) {

                        test_util.assert.propertyVal( response, 'statusCode', 200, 'status code' );

                        resolve();
                    } );
            } );
    } );
} )();
