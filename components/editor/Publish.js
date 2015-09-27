var React = require('react');
var connectToStores = require("fluxible-addons-react").connectToStores;
var RequestStore = require('../../stores/RequestStore');
var PublishStore = require('../../stores/PublishStore');
var publishAction = require('../../actions/PublishAction');

var Publish = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    publish: function() {
        this.context.executeAction(publishAction, this.props.request);
    },
    render: function() {
        var content;
        if (this.props.step === 1) {
            content = (
                <div className="o-circle-button center" onClick={this.publish}>
                    Publish
                </div>
            )
        } else if (this.props.step === 2) {
            content = (
                <h1>Publishing...</h1>
            )
        } else {
            content = (
                <h1>Done!</h1>
            )
        }
        return (
            <div className="restfull-editor-publish">
                {content}
            </div>
        );
    }
});

module.exports = connectToStores(
    Publish,
    [RequestStore, PublishStore],
    function (context, props) {
        return {
            request: context.getStore(RequestStore).getRequest(),
            step: context.getStore(PublishStore).getStep()
        }
    }
);