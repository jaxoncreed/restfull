module.exports = {
    sails: {
        main: require('./sails/mainGeneratorSails.js');
        database: {
            mongo: require('./sails/mongoGeneratorSails.js');
        }
        schema: require('./sails/schemaGeneratorSails.js');
    }
}