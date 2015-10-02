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
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var handler = require('./generatorHandler/handler');

var config = require('./config');

/* Passport Stuff */
var passport = require('passport');
var GithubStrategy = require('passport-github');
var Github = require('github-api');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy(config, 
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, { accessToken: accessToken, profile: profile });
        });
    }
));

var debug = debugLib('fluxible-template');

var server = express();
server.use(bodyParser.json())

server.use('/public', express.static(path.join(__dirname, '/public')));
server.use(compression());
server.use(cookieParser());
server.use(methodOverride());
server.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
server.use(passport.initialize());
server.use(passport.session());

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

// github authentication 
server.get('/login', passport.authenticate('github', { scope: ['repo', 'repo:status', 'repo_deployment'] }));
server.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/editor');
    }
);

var port = process.env.PORT || 3001;
server.listen(port);
console.log('Application listening on port ' + port);

module.exports = server;
