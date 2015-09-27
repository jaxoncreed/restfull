var uuidGen = require('uuid');
var mkdirp = require('mkdirp');
var fs = require('fs');
var pushToGithub = require('./pushToGithub');
var saveMetaData = require('./saveMetaData');
var generatorMap = require('../generators/generatorMap');

var workspace = './workspace/';

module.exports = function(req, res, next) { 
    var body = req.body;

    console.log(req.user);

    // Create a UUID for this process
    var uuid = uuidGen.v4();
    var folder = workspace + uuid;
    // Make a folder for that UUID
    mkdirp(folder, function(err) { 
        if (err) {
            // TODO: Handle Error
            console.log(err);
        }

        // Run the main generator for that folder
        generatorMap[body.framework].main(folder, body, function(err) {
            if (err) {
                // TODO: Handle Error
                console.log(err);
            }

            // Run the Database generator for that folder
            generatorMap[body.framework].database[body.database](folder, body, function(err) {
                if (err) {
                    // TODO: Handle Error
                    console.log(err);
                }

                // Run the Schema generator for that folder
                generatorMap[body.framework].schema(folder, body, function(err) {
                    if (err) {
                        // TODO: Handle Error
                        console.log(err);
                    }

                    // Save the restfull.json file
                    saveMetaData(folder, body, function(err) {
                        if (err) {
                            // TODO: Handle Error
                            console.log(err);
                        }

                        // Push folder to Github
                        pushToGithub(folder, body, req.user, function(err) {
                            if (err) {
                                // TODO: Handle Error
                                console.log(err);
                            }

                            //Delete Folder
                            res.send("It's good."); 
                        });
                    });
                });
            });
        })
    });
};
