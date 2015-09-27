var Github = require('github-api');

module.exports = function(folder, info, accessToken, callback) {
    console.log("Push to Github");

    console.log(accessToken);

    var github = new Github({
            token: accessToken,
            auth: 'oauth'
        });
    var user = github.getUser();

    user.createRepo({ "name": info.repoName, "description": info.repoDescription }, function(err, res) {
        if (err) {
            return callback(err);
        }
        var repo = github.getRepo(user, info.repoName);
        callback();
    })
}
