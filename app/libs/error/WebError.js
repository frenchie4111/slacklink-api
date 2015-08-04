/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var util = require( 'util' );

    var error_codes = {
        GENERAL_AUTHENTICATION_FAILURE: 4003,

        GENERAL_500: 5000
    };

    var error_code_lookups = {};
    error_code_lookups[ error_codes.GENERAL_AUTHENTICATION_FAILURE ] = 400;
    error_code_lookups[ error_codes.GENERAL_500 ] = 500;

    function WebError( web_error_code ) {
        Error.call( this, 'WebError' );
        this.code = web_error_code;
        this.web_error = error_code_lookups[ web_error_code ];
        this.name = 'WebError';
    }
    util.inherits( WebError, Error );

    WebError.prototype.toResponse = function() {
        return {
            code: this.code,
            message: this.message
        };
    };

    exports.WebError = WebError;
    exports.error_codes = error_codes;
} )();
