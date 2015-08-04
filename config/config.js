/**
 * Created by Mike Lyons
 */

( function() {
    module.exports = {
        development: {
            username: 'slacklink',
            password: 'slacklink',
            database: 'slacklink_development',
            host: '127.0.0.1',
            dialect: 'mysql'
        },
        test: {
            username: 'slacklink',
            password: 'slacklink',
            database: 'slacklink_test',
            host: '127.0.0.1',
            dialect: 'mysql'
        },
        production: {
        }
    };

    try {
        module.exports.production = require( './production' );
    } catch( err ) {
        console.error( 'Unable to load production config, is it still encrypted?' );
    }
}() );
