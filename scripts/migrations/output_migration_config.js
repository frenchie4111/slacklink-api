var assert = require( 'chai' ).assert;

var getMigrationConfig = function() {
    assert.isDefined( process.env );
    assert.property( process.env, 'MIGRATION_DATABASE_HOST' );
    assert.property( process.env, 'MIGRATION_DATABASE_NAME' );
    assert.property( process.env, 'MIGRATION_DATABASE_USERNAME' );
    assert.property( process.env, 'MIGRATION_DATABASE_PASSWORD' );
    assert.property( process.env, 'MIGRATION_DATABASE_PORT' );

    return {
        'production': {
            'username': process.env.MIGRATION_DATABASE_USERNAME,
            'password': process.env.MIGRATION_DATABASE_PASSWORD,
            'database': process.env.MIGRATION_DATABASE_NAME,
            'host': process.env.MIGRATION_DATABASE_HOST,
            'port': process.env.MIGRATION_DATABASE_PORT,
            'dialect': 'mysql'
        }
    };
};

var migration_config = getMigrationConfig();
console.log( JSON.stringify( migration_config ) );
