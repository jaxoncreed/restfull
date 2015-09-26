var async = require('async');
var fs = require('fs-extra');
var acceptedTypes = ["string", "text", "integer", "float", "date", "datetime", "boolean", "binary", "array", "json"]

module.exports = function(folder, info, callback) {
    console.log("Schema Generator");

    // Change the standard for attributes to the Sails Standard:
    var model = {};
    info.schemas.forEach(function(schema) {
        if (!model[schema.name]) {
            model[schema.name] = {};
        }
        Object.keys(schema.attributes).forEach(function(key) {
            model[schema.name][key] = schema.attributes[key];
            if (acceptedTypes.indexOf(model[schema.name][key].type) === -1) {
                model[schema.name][key].model = model[schema.name][key].type;
                delete model[schema.name][key].type;
            }
            if (model[schema.name][key].collection) {
                var type = (model[schema.name][key].model) ? model[schema.name][key].model : model[schema.name][key].type;
                model[schema.name][key].collection = type;
                model[schema.name][key].via = schema.name;
                delete model[schema.name][key].model;
                delete model[schema.name][key].type;
                if (!model[type]) {
                    model[type] = {};
                }
                if (!model[type][schema.name]) {
                    model[type][schema.name] = {};
                }
                model[type][schema.name].model = schema.name;
            }
        });
    });


    var execution = info.schemas.map(function(schema) {
        return function(schema, schemaCallback) {
            var name = schema.name.charAt(0).toUpperCase() + schema.name.slice(1);
            async.parallel([
                function (controllerCallback) {
                    fs.copy('./generators/sails/schemaTemplate/controller.js', folder + '/api/controllers/' + name + 'Controller.js', function (err) {
                        if (err) {
                            // TODO: Handle Error
                            console.log(err);
                        }
                        controllerCallback();
                    });
                },

                function (modelCallback) {
                    
                    fs.readFile('./generators/sails/schemaTemplate/model.js', 'utf8', function (err, data) {
                        var toBeSaved = data.replace("{{attributes}}", "attributes: " + JSON.stringify(model[schema.name], null, 4));
                        fs.writeFile(folder + '/api/models/' + name + '.js', toBeSaved, function(err, data) {
                            if (err) {
                                // TODO: Handle Error
                                console.log(err);
                            }
                            modelCallback();
                        });
                    });
                }
            ], schemaCallback);
            
        }.bind(null, schema);

    });
    async.parallel(execution, callback);
}