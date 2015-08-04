/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    console.log( 'Starting server...' );
    require( './app' )
        .start()
        .then( function() {
            console.log( '\tServer started' );
        } );
} )();
