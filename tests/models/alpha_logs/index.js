/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var model = {
        model_name: 'AlphaLog',
        fixture_name: 'alpha_log',
        valid: {
            event_type: 1,
            device_id: 1
        },
        fields: {
            event_type: {
                invalid: [ null, undefined, -1, 3 ],
                valid: [ 2 ]
            },
            device_id: {
                valid: [ 1, null ]
            }
        }
    };

    require( '../lib/validate_sequelize_model' )( model );
} )();
