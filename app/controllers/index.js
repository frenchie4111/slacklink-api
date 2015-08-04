/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var load_from_directory = require( 'load-from-directory' );

    /**
     * Initialized the controllers, by adding the controllers routes to the express
     * app
     * @param  {app} The express app to load the routes into
     */
    exports.initialize = function( app ) {
        load_from_directory
            .loadArray( './' )
            .forEach( ( item ) => item.addRoutes( app ) );
    };
} )();
