var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');

var Html = React.createClass({
    render: function() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link rel="stylesheet" href="/public/css/main.css" />
                <link rel="stylesheet" href="/public/css/oui.css" />
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
            </body>
            <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            <script src={'/public/js/' + this.props.clientFile}></script>
            </html>
        );
    }
});

module.exports = Html;
