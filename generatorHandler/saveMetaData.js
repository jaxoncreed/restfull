var fs = require('fs');

module.exports = function(folder, info, callback) {
    fs.writeFile(folder + '/restfull.json', JSON.stringify(info, null, 4), function(err, data) {
        if (err) {
            callback(err);
        } else {
            callback();
        }
    });
};