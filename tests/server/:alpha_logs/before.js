/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {

    var _log_trust = {
        id: {
            type: 'number'
        },

        event_type: {
            type: 'number'
        },
        device_id: {
            type: 'number'
        },
        timestamp: {
            type: 'string'
        },

        created_at: {
            type: 'string'
        }
    };

    beforeEach( function() {
        global.log_trust = _log_trust;
    } );

    afterEach( function() {
        delete global.log_trust;
    } );
} )();
