var fs = require('fs-extra');

module.exports = function(folder, info, callback) {
    console.log("Main Generator");
    // Copy everything over to the right folder
    fs.copy('./generators/sails/template', folder, function (err) {
        if (err) {
            // TODO: Handle Error
            console.log(err);
        }

        // Update Package.json
        fs.readFile(folder + '/package.json', 'utf8', function (err, data) {
            if (err) {
                // TODO: Handle Error
                console.log(err);
            }
            var pack = JSON.parse(data);
            pack.name = info.repoName;
            pack.description = info.repoDescription;
            // TODO: Repo Info
            fs.writeFile(folder + '/package.json', JSON.stringify(pack, null, 4), function(err, data) {
                if (err) {
                    // TODO: Handle Error
                    console.log(err);
                }
                callback();
            });
        });
    });
}