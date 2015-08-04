/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    module.exports = function _logResponseBody() {
        return function( req, res, next ) {
            var oldWrite = res.write,
                oldEnd = res.end;

            var chunks = [];

            res.write = function( chunk ) {
                chunks.push( chunk );

                oldWrite.apply( res, arguments );
            };

            res.end = function( chunk ) {
                if( chunk ) {
                    chunks.push( chunk );
                }

                var body = Buffer.concat( chunks ).toString( 'utf8' );
                console.log( 'Response' );
                console.log( req.path, body );
                console.log( 'Session After' );
                console.log( req.session );
                console.log( '============= End Request =============' );

                oldEnd.apply( res, arguments );
            };

            next();
        };
    };
} )();
