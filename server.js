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

var Github = require('github-api');
var github = new Github({
    username: 'restfull-test',  // need input here
    password: 'radpassword11',  // need input here
    auth: 'basic'
});

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
server.get('/login', function(req, res) {
        // not handled
    }
);

// create repo
server.get('/create_repo', function(req, res){
    var user = github.getUser();
    user.createRepo({ 'name': 'test' },  // put repo name here
        function(err, res) { if(err) console.log(err) });
    res.end();
});

// push to repo
server.get('/push_repo', function(req, res) {
    var repo = github.getRepo('restfull-test', 'test');  // repo name and username go here
    repo.write('master', 'server.js', 'new contents', 'commit message', function(err) { console.log(err) });
    res.end();  // branch   file        file contents?    commit message
})

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

module.exports = server;
