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
                <div className="o-circle-button center big-button" onClick={this.publish}>
                    Publish
                </div>
            )
        } else if (this.props.step === 2) {
            content = (
                <h1 className="restfull-editor-publish-text">Publishing...</h1>
            )
        } else {
            content = (
                <span>
                <h1 className="restfull-editor-publish-text">Done!</h1>
                    <a href={this.props.url}><div className="o-circle-button center">
                        See Repo
                    </div></a>
                </span>
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
            step: context.getStore(PublishStore).getStep(),
            url: context.getStore(PublishStore).getUrl()
        }
    }
);