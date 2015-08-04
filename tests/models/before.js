/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {
    var path = require( 'path' );

    var q = require( 'q' ),
        fixtures = require( 'sequelize-test-fixtures' );

    before( function *() {
        var models = require( '../../app/models' );
        yield models.init();
        global.test_util.db = models.db;
    } );

    before( function() {
        var models = require( '../../app/models' );
        fixtures( models.db, path.resolve( __dirname, '../fixtures/' ) );
        global.test_util.fixtures = fixtures;
    } );

    var models_to_delete = [
        'AlphaLog',
        'Token',
        'User'
    ];

    var _clearModels = function() {
        var models = require( '../../app/models' );

        var promise = models_to_delete
            .reduce( function( full, className ) {
                var tableName = models.db[ className ].tableName;
                return full.then( () => {
                    return models.db.sequelize.query( 'TRUNCATE TABLE ' + tableName + ';' );
                } );
            }, q.try( function() {} ) );

        return promise;
    };
    module.exports.clearModels = _clearModels;

    beforeEach( function *() {
        yield _clearModels().catch( console.error );
    } );

} )();
