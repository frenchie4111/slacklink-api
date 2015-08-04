/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var model = {
        model_name: 'Token',
        fixture_name: 'token',
        primary_key: 'token',
        valid: {
            token: '12345678901234567890123456789012',
            expires: new Date(),
            user_id: 1
        },
        fields: {
            token: {
                invalid: [ 1, false ],
                valid: [ 'asdf' ],
                test_update: false
            },
            expires: {
                invalid: [ 'asdf' ],
                valid: [ new Date() ],
                test_update: false
            },
            user_id: {
                invalid: [ null, undefined, 'string' ]
            }
        }
    };

    beforeEach( function* () {
        var before_fixtures = yield test_util.fixtures.load( [ 'user' ] )
            .catch( function( err ) {
                console.log( 'ERROR' );
                console.error( err );
            } );
        model.valid.user_id = before_fixtures.user.id;
    } );

    require( '../lib/validate_sequelize_model' )( model );
} )();
