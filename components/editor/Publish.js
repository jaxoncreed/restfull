var React = require('react');
var connectToStores = require("fluxible-addons-react").connectToStores;
var RequestStore = require('../../stores/RequestStore');
var publishAction = require('../../actions/PublishAction');

var Publish = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    publish: function() {
        this.context.executeAction(publishAction, this.props.request);
    },
    render: function() {
        return (
            <div>
                <p>Publish</p>
                <p>{JSON.stringify(this.props.request, null, 4)}</p>
                <div className="o-circle-button" onClick={this.publish}>
                    Publish
                </div>
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