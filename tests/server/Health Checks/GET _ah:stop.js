/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    it( 'GET _ah/stop', function *() {

        var exit_ran = false;
        var _exit = process.exit;
        process.exit = function() {
            exit_ran = true;
        };

        yield new test_util.q
            .Promise( function( resolve ) {
                test_util.request
                    .get( 'http://localhost:1338/_ah/stop' )
                    .on( 'response', function( response ) {
                        process.exit = _exit;

                        test_util.assert.propertyVal( response, 'statusCode', 200, 'status code' );
                        test_util.assert.isTrue( exit_ran, 'exit ran' );

                        resolve();
                    } );
            } );
    } );
} )();
