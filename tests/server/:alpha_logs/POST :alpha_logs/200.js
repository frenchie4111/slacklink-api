/* global log_trust */
/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    it( 'valid', function *() {
        var log_trust_clone = test_util.lodash.cloneDeep( log_trust );
        delete log_trust_clone.created_at;

        yield test_util.trust( {
            method: 'post',
            path: '/log',
            body: {
                device_id: 1,
                timestamp: new Date().getTime(),
                event_type: 1
            }
        }, {
            code: 200,
            body: log_trust_clone
        } );
    } );
} )();
