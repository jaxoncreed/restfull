var React = require('react');
var updateInfoAction = require('../../actions/UpdateInfoAction');
var connectToStores = require("fluxible-addons-react").connectToStores;
var RequestStore = require('../../stores/RequestStore');

var General = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    updateInfo: function(path, e) {
        this.context.executeAction(updateInfoAction, { path: path, value: e.target.value});
    },
    render: function() {
        return (
            <div>
                <p>General</p>
                <label for="repoName">Repo Name</label>
                <input type="text"  id="repoName" ref="repoName" value={this.props.request.repoName} onChange={this.updateInfo.bind(null, ['repoName'])} />

                <label for="repoDescription">Repo Name</label>
                <input type="text"  id="repoDescription" ref="repoDescription" value={this.props.request.repoDescription} onChange={this.updateInfo.bind(null, ['repoDescription'])} />
                <p>{this.props.request.repoName}</p>
            </div>
        );
    }
});

module.exports = connectToStores(
    General,
    [RequestStore],
    function (context, props) {
        return {
            request: context.getStore(RequestStore).getRequest()
        }
    }
);