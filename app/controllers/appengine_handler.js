/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {

    var _ok = function( req, res ) {
        res.set( 'Content-Type', 'text/plain' );
        res.status( 200 ).send( 'ok' );
    };

    var _ok_exit = function( req, res ) {
        res.set( 'Content-Type', 'text/plain' );
        res.status( 200 ).send( 'ok' );
        process.exit();
    };

    exports.addRoutes = function( app ) {
        app.get( '/_ah/health', _ok );
        app.get( '/_ah/start', _ok );
        app.get( '/_ah/stop', _ok_exit );
    };
} )();
