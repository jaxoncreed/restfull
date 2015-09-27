var React = require('react');

var Home = React.createClass({
    render: function() {
        return (
            <div className="restfull-home">
                <h1></h1>
                <div className='header-logo'>
                	<div className='huge-text'>RESTFULL</div>
                	<img className='logo-large' src='/public/img/raccoon.png' />
                </div>
                <div className='header-direction'>
                	<div className='header-smalltext'>Build your Back-End in Minutes!</div><br />
                	<a href='/login'><div className='o-circle-button center no-link'>Let's get started!</div></a>
                </div>
            </div>
        );
    }
});

module.exports = Home;