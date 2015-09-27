var Github = require('github-api');

module.exports = function(folder, info, accessToken, callback) {
    console.log("Push to Github");

    console.log(accessToken);

    var github = new Github({
            token: accessToken,
            auth: 'oauth'
        });
    var user = github.getUser();

    user.createRepo({ "name": "test" }, function(err, res) {
        if (err) {
            return callback(err);
        }
        var repo = github.getRepo(user, info.repoName);
        callback();
    })
}

/*
server.get('/create_repo', function(req, res){
    if(!github) { res.redirect('/') }  // user not logged in
    var user = github.getUser();
    user.createRepo({ 'name': 'rest-test' },  // put repo name here
        function(err, res) { if(err) console.log(err) });
    res.end();
});

// push to repo
server.get('/push_repo', function(req, res) {
    if(!github) { res.redirect('/') }  // user not logged in
    var repo = github.getRepo(user, 'rest-test');
    repo.write('master', 'server.js', 'new contents', 'commit message', function(err) { console.log(err) });
    res.end();  // branch   file        file contents?    commit message
})
*/