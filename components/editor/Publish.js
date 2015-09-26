var React = require('react');
var connectToStores = require("fluxible-addons-react").connectToStores;
var RequestStore = require('../../stores/RequestStore');

var Publish = React.createClass({
    render: function() {
        return (
            <div>
                <p>Publish</p>
                <p>{JSON.stringify(this.props.request, null, 4)}</p>
            </div>
        );
    }
});

module.exports = connectToStores(
    Publish,
    [RequestStore],
    function (context, props) {
        return {
            request: context.getStore(RequestStore).getRequest()
        }
    }
);