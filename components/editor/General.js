var React = require('react');
var updateInfoAction = require('../../actions/UpdateInfoAction');
var connectToStores = require("fluxible-addons-react").connectToStores;
var RequestStore = require('../../stores/RequestStore');

var allowedFrameworks = ['sails'];
var allowedDatabases = ['mongo'];

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
                <h1>General Information</h1>
                <div className="restfull-editor-section"><div className="restfull-editor-section-center">
                    <label for="repoName">Repo Name</label>
                    <input type="text"  id="repoName" ref="repoName" value={this.props.request.repoName} onChange={this.updateInfo.bind(null, ['repoName'])} />

                    <label for="repoDescription">Repo Description</label>
                    <input type="text"  id="repoDescription" ref="repoDescription" value={this.props.request.repoDescription} onChange={this.updateInfo.bind(null, ['repoDescription'])} />
                
                    <label for="framework">Framework</label>
                    <select id="framework" ref="framework" value={this.props.request.framework} onChange={this.updateInfo.bind(null, ['framework'])}>
                        {allowedFrameworks.map(function(framework) {
                            return (<option value={framework}>{framework}</option>);
                        }.bind(this))}
                    </select>

                    <label for="database">Database</label>
                    <select id="database" ref="database" value={this.props.request.database} onChange={this.updateInfo.bind(null, ['database'])}>
                        {allowedDatabases.map(function(database) {
                            return (<option value={database}>{database}</option>);
                        }.bind(this))}
                    </select>

                </div></div>
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