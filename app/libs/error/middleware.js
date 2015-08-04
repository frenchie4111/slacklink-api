/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    module.exports = function errorHandler( err, req, res, next ) {
        console.error( 'err' );
        console.error( err );
        console.error( err.message );
        console.error( err.stack );
        if( err.name === 'WebError' ) {
            res.status( err.web_error ).send( err.toResponse() );
        } else {
            res.status( 500 ).send( {
                code: 5000,
                error: err
            } );
        }
    };
} )();
