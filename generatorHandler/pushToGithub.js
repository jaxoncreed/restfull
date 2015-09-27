var Github = require('github-api');
var spawn = require('child_process').spawn;
var async = require('async');


module.exports = function(folder, info, accessToken, userName, callback) {
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
        var repoUrl = 'https://' + userName + ':' + accessToken + '@github.com/' + userName + '/' + info.repoName + '.git';

        var push = spawn('./generatorHandler/push', [folder, repoUrl]);
        push.stdout.on('data', function (data) {    // register one or more handlers
          console.log('stdout: ' + data);
        });

        push.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });

        push.on('exit', function (code) {
          console.log('child process exited with code ' + code);
          callback();
        });
    })
}
