/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var _ = require( 'underscore' );

    var exclude = [
        'password',
        'password_confirmation',
        'secret_answer'
    ];

    module.exports = function _logRequestBody() {
        return function( req, res, next ) {
            console.log( '============= Begin Request =============' );
            console.log( 'Request body' );

            // This handles removing any keys that should be redacted from the body that we print
            var req_body_clone = _
                .chain( req.body )
                .map( function( value, key ) {
                    var should_exclude = _.any( exclude, function( item ) {
                        return item === key;
                    } );
                    if( should_exclude ) {
                        return [ key, '<redacted>' ];
                    }
                    return [ key, value ];
                } )
                .reduce( function( full, part ) {
                    full[ part[ 0 ] ] = part[ 1 ];
                    return full;
                }, {} );

            console.log( req_body_clone );
            console.log( 'Request url' );
            console.log( req.url );
            next();
        };
    };
} )();
