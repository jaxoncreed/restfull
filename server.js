/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

var express = require('express');
var compression = require('compression');
var path = require('path');
var serialize = require('serialize-javascript');
var {navigateAction} = require('fluxible-router');
var debugLib = require('debug');
var React = require('react');
var app = require('./app');
var HtmlComponent = require('./components/Html');
var { createElementWithContext } = require('fluxible-addons-react');
var htmlComponent = React.createFactory(HtmlComponent);
var env = process.env.NODE_ENV;
var bodyParser = require('body-parser');
var handler = require('./generatorHandler/handler');

var config = require('./config');

var passport = require('passport');
var GithubStrategy = require('passport-github');
var Github = require('github-api');
var github;
var user;

passport.use(new GithubStrategy({
    clientID: config.client_id,
    clientSecret: config.client_secret,
    callbackURL: config.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        github = new Github({
            token: accessToken,
            auth: 'oauth'
        });
        user = profile.username;
        return done();
    }
));

var debug = debugLib('fluxible-template');

var server = express();
server.use(bodyParser.json())

server.use('/public', express.static(path.join(__dirname, '/public')));
server.use(compression());

server.post('/create', handler);

server.use(function(req, res, next) {
    var context = app.createContext();

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, function(err) {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        var html = React.renderToStaticMarkup(htmlComponent({
            clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(createElementWithContext(context))
        }));

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

// authentication 
server.get('/login', passport.authenticate('github'));
server.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    }
);


// create repo
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

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

module.exports = server;
