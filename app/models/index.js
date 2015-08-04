/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var fs = require( 'fs' ),
        path = require( 'path' );

    var Sequelize = require( 'sequelize' ),
        _ = require( 'underscore' );

    var config = require( '../../config' );

    var previously_initialized = false,
        models = {};

    var defaultInstanceMethods = {};
    var defaultClassMethods = {};

    /**
     * Initializes database using conifuration settings found in config/index.js
     * This function is blocking until the database is initialized
     * @return {Object} Database
     */
    module.exports.init = function init() {
        if( previously_initialized ) return null;

        previously_initialized = true;

        var database_config = config.database[ config.env ];

        console.log( 'database_config', database_config );

        var sequelize = new Sequelize(
                database_config.database,
                database_config.username,
                database_config.password,
                {
                    dialect: 'mysql',
                    protocol: 'mysql',
                    port: database_config.port,
                    host: database_config.host,
                    logging: console.log,
                    native: database_config.native,
                    define: {
                        instanceMethods: defaultInstanceMethods,
                        classMethods: defaultClassMethods
                    },
                    dialectOptions: database_config.dialectOptions
                } );

        // Load all models in directory
        fs
            .readdirSync( __dirname )
            .filter( function filenameFilter( filename ) {
                return ( ( filename.charAt( 0 ) !== '.' ) && ( filename !== 'index.js' ) );
            } )
            .forEach( function filenameHandler( filename ) {
                var model = sequelize.import( path.join( __dirname, filename ) );
                models[ model.name ] = model;
            } );

        // Allow each model to create it's associations
        Object.keys( models ).forEach( function modelHandler( modelname ) {
            if( models[ modelname ].options.hasOwnProperty( 'associate' ) ) models[ modelname ].options.associate( models );
        } );

        // Create exportable database
        var db = _.extend( {
            sequelize: sequelize,
            Sequelize: Sequelize
        }, models );

        // Add database to exports
        module.exports.db = db;

        // Return database
        return db;
    };

    module.exports.deinit = function() {
        models = {};
        delete module.exports.db;
        previously_initialized = false;
    };

} )();
