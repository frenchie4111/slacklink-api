/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    it( 'standard', function *() {
        var user_fixtures = yield test_util.fixtures.load( [ 'user_password' ] );

        yield test_util.trust( {
            path: '/tokens',
            method: 'post',
            body: {
                email: user_fixtures.user_password.email,
                password: 'test'
            }
        }, {
            status: 200,
            body: {
                token: {
                    type: 'string'
                },
                expires: {
                    type: 'string'
                },
                user_id: {
                    type: 'number'
                }
            }
        } );
    } );
} )();
