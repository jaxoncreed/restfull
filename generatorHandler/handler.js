var uuidGen = require('uuid');
var mkdirp = require('mkdirp');

var workspace = './workspace/';

module.exports = function(req, res, next) { 
    console.log(req.body);

    // Create a UUID for this process
    var uuid = uuidGen.v4();
    var folder = workspace + uuid;
    // Make a folder for that UUID
    mkdirp(folder, function(err) { 
        if (err) {
            // TODO: Handle Error
            console.log(err);
        }
        
        res.send("It's good."); 
    });
    // Run the main generator for that folder
    // Run the Database generator for that folder
    // Run the Schema generator for that folder
    // Save the restfull.json file
    // Push folder to Github
    // Delete folder
};