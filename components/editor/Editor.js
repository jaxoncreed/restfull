var React = require('react');
var General = require('./General');
var Schemas = require('./Schemas');
var Publish = require('./Publish');

var Editor = React.createClass({
    getInitialState: function() {
        return {
            form: Schemas
        }
    },
    changeForm: function(component) {
        this.setState({ form: component });
    },
    render: function() {
        var Form = this.state.form;
        return (
            <div>
                <div className="o-circle-button" onClick={this.changeForm.bind(null, General)}>
                    General
                </div>
                <div className="o-circle-button" onClick={this.changeForm.bind(null, Schemas)}>
                    Schemas
                </div>
                <div className="o-circle-button" onClick={this.changeForm.bind(null, Publish)}>
                    Publish
                </div>
                <Form />
            </div>
        );
    }
});

module.exports = Editor;
