/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var _ = require( 'underscore' );

    // Ordering of this array DEFINITELY matters
    var middleware = [
        require( './log_response_body' )(),
        require( 'body-parser' ).json(),
        require( 'body-parser' ).urlencoded( { extended: true } ),
        require( './log_request_body' )(),
        require( '../libs/error/middleware' )
    ];

    /**
     * Initializes middleware. The array defined above (middleware) is the list of middlewares that it will install
     * into the app
     * @param app The app to install the middleware into
     * @param options This options array is passed to the object type of middleware
     */
    exports.initialize = function( app, options ) {
        _.each( middleware, function( middleware_i ) {
            /**
             * Function type `middleware, the initializer tells the app to use this function in it's processing
             * chain
             */
            if( _.isFunction( middleware_i ) ) {
                console.log( middleware_i );
                return app.use( middleware_i );
            }

            /**
             * Object type middleware, the initializer calls the init function passing in the app and options
             */
            if( _.isObject( middleware_i ) && middleware_i.init ) {
                middleware_i.init( app, options );
            }
        } );
    };
} )();
