var fs = require('fs-extra');

module.exports = function(folder, info, callback) {
    console.log("Mongo Generator");

    fs.copy('./generators/sails/mongoTemplate', folder + '/config', function (err) {
        if (err) {
            // TODO: Handle Error
            console.log(err);
        }
        callback();
    });
}