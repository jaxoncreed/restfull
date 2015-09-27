var React = require('react');
var NavLink = require('fluxible-router').NavLink;

var Header = React.createClass({
    render: function() {
        var racoon = "";
        console.log(this.props.page);
        if (this.props.page !== "RESTfull | Create your Back-End in Minutes") {
            racoon = (<div className='header-image'>
                        <img src='/public/img/raccoon.png' />
                    </div>);
        }
        return (
            <header className="restfull-header no-link">
                <div className="restfull-header-item">
                    <NavLink href="/">
                        <h1>RESTfull.net</h1>
                    </NavLink>
                    {racoon}
                </div>
            </header>
        );
    }
});

module.exports = Header;