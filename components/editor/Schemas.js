var React = require('react');
var updateInfoAction = require('../../actions/UpdateInfoAction');
var addSchemaAction = require('../../actions/AddSchemaAction');
var addAttributeAction = require('../../actions/AddAttributeAction');
var removeSchemaAction = require('../../actions/RemoveSchemaAction');
var removeAttributeAction = require('../../actions/removeAttributeAction');
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
    removeSchema: function() {
        this.context.executeAction(removeSchemaAction, this.state.schemaIndex);
        this.setState({ schemaIndex: 0 });
    },
    removeAttribute: function(attributeIndex) {
        this.context.executeAction(removeAttributeAction, { schemaIndex: this.state.schemaIndex, attributeIndex: attributeIndex });
    },
    render: function() {
        return (
            <div>
                <h1>Database Schemas and RESTful End-Points</h1>
                <div className="restfull-editor-section-center">
                    {this.props.request.schemas.map(function(schema, index) {
                        var tabClass = "restfull-editor-schema";
                        if (index === this.state.schemaIndex) {
                            tabClass = "restfull-editor-schema restfull-editor-schema-selected";
                        }
                        return (<div className={tabClass} onClick={this.changeSchemaIndex.bind(null, index)}>{schema.name}</div>);
                    }.bind(this))}
                    <div className="restfull-editor-schema restfull-editor-schema-new" onClick={this.addSchema}>New Schema</div>
                    <div className="clear"></div>
                </div>

                <div className="restfull-editor-section"><div className="restfull-editor-section-center">
                    <label for="schemaName">Schema Name</label>
                    <input type="text"  id="schemaName" ref="schemaName" value={this.props.request.schemas[this.state.schemaIndex].name} onChange={this.updateInfo.bind(null, ['schemas', this.state.schemaIndex, 'name'])} />
                    <div className="o-circle-button center" onClick={this.removeSchema}>
                        Remove Schema
                    </div>
                </div></div>

                {this.props.request.schemas[this.state.schemaIndex].attributes.map(function(attribute, attrIndex) {
                    return (
                        <div className="restfull-editor-section"><div className="restfull-editor-section-center">
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
                            <div className="o-circle-button center" onClick={this.removeAttribute.bind(null, attrIndex)}>
                                Remove Attribute
                            </div>
                        </div></div>
                    );
                }.bind(this))}
                
                <div className="o-circle-button restfull-editor-add-attribute" onClick={this.addAttribute}>
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