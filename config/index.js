/**
 * Created by Mike Lyons
 */

( function() {
    module.exports = {
        version: 1,
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 8080,
        // This is titled config, because the sequelize-cli requires it
        database: require( './config' ),
        secrets: {}
    };

    try {
        module.exports.secrets = require( './secrets' );
    } catch( err ) {
        console.error( 'Unable to load secrets config, is it still encrypted?' );
    }
}() );
