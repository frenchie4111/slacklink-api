/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {

    var _user_trust = {
        id: {
            type: 'number'
        },
        email: {
            type: 'string'
        },
        created_at: {
            type: 'string'
        },
        updated_at: {
            type: 'string'
        }
    };

    beforeEach( function() {
        global.user_trust = _user_trust;
    } );

    afterEach( function() {
        delete global.user_trust;
    } );
} )();
