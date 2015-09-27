var React = require('react');

var Home = React.createClass({
    render: function() {
        return (
            <div className="restfull-home">
                <h1></h1>
                <div className='header-logo'>
                	<div className='huge-text'>RESTFULL</div>
                	<img className='logo-large' src='/public/img/raccoon.svg' />
                </div>
                <div className='header-direction'>
                	<div className='header-smalltext'>Build your Back-End in Minutes!</div><br />
                	<button className='login-button'>Let's get started!</button>
                </div>
            </div>
        );
    }
});

module.exports = Home;