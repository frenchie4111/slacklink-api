/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var express = require( 'express' ),
        cors = require( 'cors' ),
        q = require( 'q' );

    var config = require( '../config' ),
        controllers = require( './controllers' ),
        models = require( './models' ),
        middleware = require( './middleware' );

    var app = express(),
        server = null;

    middleware.initialize( app );

    var whitelist = [ 'https://slacklink.com' ];
    var cors_options = {
        origin: function( origin, callback ) {
            var origin_is_whitelisted = whitelist.indexOf( origin ) !== -1;
            console.log( origin, origin_is_whitelisted, whitelist );
            callback( null, origin_is_whitelisted );
        }
    };
    app.use( cors( cors_options ) );

    var startServer = function() {
        return new q.Promise( function( resolve ) {
            var started_server = app.listen( config.port, '0.0.0.0', function() {
                controllers.initialize( app );
                resolve( started_server );
            } );
        } );
    };

    exports.start = function() {
        return q
            .async( function *() {
                yield models.init();
                server = yield startServer();
            } )()
            .catch( console.error );
    };

    exports.stop = function() {
        return new q.Promise( function( resolve ) {
            if( server ) {
                server.on( 'close', function() {
                    resolve();
                } );
                server.close();
            }
        } );
    };
} )();
