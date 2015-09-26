var React = require('react');
var updateInfoAction = require('../../actions/UpdateInfoAction');
var addSchemaAction = require('../../actions/AddSchemaAction');
var addAttributeAction = require('../../actions/AddAttributeAction')
var connectToStores = require("fluxible-addons-react").connectToStores;
var RequestStore = require('../../stores/RequestStore');

var Schemas = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            schemaIndex: 0,
            allowedTypes: this.getAllowedTypes(this.props.request)
        }
    },
    componentWillReceiveProps: function(newProps) {
        this.setState({ allowedTypes: this.getAllowedTypes(newProps.request) });
    },
    getAllowedTypes: function(request) {
        var allowedTypes = ["string", "text", "integer", "float", "date", "datetime", "boolean", "binary", "array", "json"];
        request.schemas.forEach(function(schema) {
            allowedTypes.push(schema.name);
        });
        return allowedTypes;
    },
    changeSchemaIndex: function(index) {
        this.setState({ schemaIndex: index });
    },
    updateInfo: function(path, e) {
        this.context.executeAction(updateInfoAction, { path: path, value: e.target.value});
    },
    updateCheckBoxInfo: function(path, e) {
        this.context.executeAction(updateInfoAction, { path: path, value: e.target.checked});
    },
    addSchema: function() {
        this.context.executeAction(addSchemaAction, {});
        this.setState({ schemaIndex: this.props.request.schemas.length });
    },
    addAttribute: function() {
        this.context.executeAction(addAttributeAction, { schemaIndex: this.state.schemaIndex });
    },
    render: function() {
        return (
            <div>
                <p>Schemas</p>
                <ul>
                    {this.props.request.schemas.map(function(schema, index) {
                        return (<li onClick={this.changeSchemaIndex.bind(null, index)}>{schema.name}</li>);
                    }.bind(this))}
                    <li onClick={this.addSchema}>New Schema</li>
                </ul>

                {this.state.schemaIndex}

                <label for="schemaName">Schema Name</label>
                <input type="text"  id="schemaName" ref="schemaName" value={this.props.request.schemas[this.state.schemaIndex].name} onChange={this.updateInfo.bind(null, ['schemas', this.state.schemaIndex, 'name'])} />

                    {this.props.request.schemas[this.state.schemaIndex].attributes.map(function(attribute, attrIndex) {
                        return (
                            <div>
                                <label for="attributeKey">Key</label>
                                <input type="text"  id="attributeKey" ref="attributeKey" value={this.props.request.schemas[this.state.schemaIndex].attributes[attrIndex].key} onChange={this.updateInfo.bind(null, ['schemas', this.state.schemaIndex, 'attributes', attrIndex, 'key'])} />
                                <label for="attributeType">Type</label>
                                <select id="attributeType" ref="attributeType" value={this.props.request.schemas[this.state.schemaIndex].attributes[attrIndex].type} onChange={this.updateInfo.bind(null, ['schemas', this.state.schemaIndex, 'attributes', attrIndex, 'type'])}>
                                    {this.state.allowedTypes.map(function(type) {
                                        return (<option value={type}>{type}</option>);
                                    }.bind(this))}
                                </select>
                                <input type="checkbox" id="required" ref="required" checked={this.props.request.schemas[this.state.schemaIndex].attributes[attrIndex].required} onChange={this.updateCheckBoxInfo.bind(null, ['schemas', this.state.schemaIndex, 'attributes', attrIndex, 'required'])}>Is Required</input>
                                <input type="checkbox" id="primaryKey" ref="primaryKey" checked={this.props.request.schemas[this.state.schemaIndex].attributes[attrIndex].primaryKey} onChange={this.updateCheckBoxInfo.bind(null, ['schemas', this.state.schemaIndex, 'attributes', attrIndex, 'primaryKey'])}>Is Primary Key</input>
                                <input type="checkbox" id="unique" ref="unique" checked={this.props.request.schemas[this.state.schemaIndex].attributes[attrIndex].unique} onChange={this.updateCheckBoxInfo.bind(null, ['schemas', this.state.schemaIndex, 'attributes', attrIndex, 'unique'])}>Is Unique</input>
                                <input type="checkbox" id="autoIncrement" ref="autoIncrement" checked={this.props.request.schemas[this.state.schemaIndex].attributes[attrIndex].autoIncrement} onChange={this.updateCheckBoxInfo.bind(null, ['schemas', this.state.schemaIndex, 'attributes', attrIndex, 'autoIncrement'])}>Auto-Increments</input>
                                <input type="checkbox" id="collection" ref="collection" checked={this.props.request.schemas[this.state.schemaIndex].attributes[attrIndex].collection} onChange={this.updateCheckBoxInfo.bind(null, ['schemas', this.state.schemaIndex, 'attributes', attrIndex, 'collection'])}>Collection of Items</input>
                            </div>
                        );
                    }.bind(this))}
                
                <div className="o-circle-button" onClick={this.addAttribute}>
                    Add New Attribute
                </div>
            </div>
        );
    }
});

module.exports = connectToStores(
    Schemas,
    [RequestStore],
    function (context, props) {
        return {
            request: context.getStore(RequestStore).getRequest()
        }
    }
);