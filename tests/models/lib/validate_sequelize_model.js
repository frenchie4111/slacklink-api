/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

( function() {

    /**
     * Creates a test that validates a promise generator (q.async) throws a certain error
     * @param  {string} title      The title of the test to be created
     * @param  {string} error_name The name (err.name) of the error that is expected
     * @param  {function *} generator  The generator to run (use yield {promise} to do async tasks)
     */
    var it_throws = function( title, error_name, generator ) {
        it( title, function( done ) {
            test_util.assert.isDefined( error_name, 'it_throws error_name must be defined' );
            test_util.assert.isDefined( generator, 'it_throws generator must be defined' );

            test_util.q
                .async( generator )()
                .then( function() {
                    done( new Error( 'Expected ' + title + ' to throw' ) );
                } )
                .catch( function( err ) {
                    console.error( err );
                    console.error( err.stack );
                    test_util.assert.equal( err.name, error_name );
                    done();
                } )
                .catch( function( err ) {
                    done( err );
                } );
        } );
    };

    /**
     * Validates that a model can't be created with the given invalid key/value pair added to
     * a valid body
     * @param  {Sequelize.Model} model         The model to attemp to create
     * @param  {Object} valid         The valid object, if Sequelize.Model.prototype.create was run on this, it would succeed
     * @param  {string} invalid_key   The key to make invalid
     * @param  {string} invalid_value The value to set the invalid key to
     * @return {Promise}               Returns a promise that attempts to create the model, will throw error if fails
     */
    var create_validate = function( model, valid, invalid_key, invalid_value ) {
        return test_util.q
            .async( function *() {
                var valid_clone = test_util.lodash.cloneDeep( valid );
                valid_clone[ invalid_key ] = invalid_value;

                yield model.create( valid_clone );
            } )();
    };

    /**
     * Below is a monster method that runs tests on a model defined in desc
     * @param desc The model definition
     * @param desc.model_name The name of the model, should be found in db[ desc.model_name ] (db should be global)
     * @param desc.fixture_name The name of the fixture (for fixture_name) Also assumed that the fixture key is equal to the fixture name
     * @param desc.valid {Object} valid object, used for create tests
     * @param desc.fields {Object} List of fields
     * @param desc.fields[key] Name of field
     * @param desc.fields[key].valid {Array} Valid values for the field (Each will be tested on valid step)
     * @param desc.fields[key].invalid {Array} Invalid values for the field (All tested on invalid step)
     */
    module.exports = function( desc ) {
        describe( 'create', function() {
            it( 'Valid', function *() {
                var created = yield test_util.db[ desc.model_name ].create( desc.valid );
                test_util.assert.isDefined( created );
            } );

            describe( 'Validations', function() {
                test_util._
                    .each( desc.fields, function( field_desc, field_name ) {
                        describe( field_name, function() {
                            test_util._
                                .each( field_desc.invalid, function( value ) {
                                    it_throws( '' + value, 'SequelizeValidationError', function *() {
                                        yield create_validate( test_util.db[ desc.model_name ], desc.valid, field_name, value );
                                    } );
                                } );
                        } );
                    } );
            } );
        } );

        describe( 'updateAttributes', function() {
            test_util._
                .each( desc.fields, function( field_desc, field_name ) {
                    if( field_desc.test_update === false ) return;
                    describe( field_name, function() {
                        describe( 'Valid', function() {
                            test_util._
                                .each( field_desc.valid, function( value ) {
                                    it( '' + value, function *() {
                                        var test_fixtures = yield test_util.fixtures.load( [ desc.fixture_name ] );

                                        var update_body = {};
                                        update_body[ field_name ] = value;

                                        yield test_fixtures[ desc.fixture_name ]
                                            .updateAttributes( update_body, { fields: [ field_name ] } );

                                        var where_clause = {},
                                            primary_key = 'id';

                                        if( desc.primary_key ) primary_key = desc.primary_key;

                                        where_clause[ primary_key ] = test_fixtures[ desc.fixture_name ][ primary_key ];

                                        var found = yield test_util.db[ desc.model_name ]
                                            .find( {
                                                where: where_clause
                                            } );

                                        found = found.get();

                                        test_util.assert.propertyVal( found, field_name, value );
                                    } );
                                } );
                        } );

                        describe( 'Invalid', function() {
                            test_util._
                                .each( field_desc.invalid, function( value ) {
                                    it_throws( '' + value, 'SequelizeValidationError', function *() {
                                        var test_fixtures = yield test_util.fixtures.load( [ desc.fixture_name ] );

                                        var update_body = {};
                                        update_body[ field_name ] = value;

                                        yield test_fixtures[ desc.fixture_name ]
                                            .updateAttributes( update_body );
                                    } );
                                } );
                        } );
                    } );
                } );
        } );
    };
} )();
