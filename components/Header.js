var React = require('react');
var NavLink = require('fluxible-router').NavLink;

var Header = React.createClass({
    render: function() {
        return (
            <header className="restfull-header no-link">
                <div className="restfull-header-item">
                    <NavLink href="/">
                        <h1>RESTfull.net</h1>
                    </NavLink>
                </div>
            </header>
        );
    }
});

module.exports = Header;