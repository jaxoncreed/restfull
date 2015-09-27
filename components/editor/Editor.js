var React = require('react');
var General = require('./General');
var Schemas = require('./Schemas');
var Publish = require('./Publish');

var Editor = React.createClass({
    getInitialState: function() {
        return {
            form: General
        }
    },
    changeForm: function(component) {
        this.setState({ form: component });
    },
    render: function() {
        var Form = this.state.form;
        return (
            <div className="restfull-editor">
                
                <Form />
                <nav className="restfull-editor-nav">
                    <div className="restfull-editor-nav-container">
                        <div className="o-circle-button restfull-editor-nav-button" onClick={this.changeForm.bind(null, General)}>
                            General
                        </div>
                        <div className="o-circle-button restfull-editor-nav-button" onClick={this.changeForm.bind(null, Schemas)}>
                            Schemas
                        </div>
                        <div className="o-circle-button restfull-editor-nav-button" onClick={this.changeForm.bind(null, Publish)}>
                            Publish
                        </div>
                        <div className="clear"></div>
                    </div>
                </nav>
            </div>
        );
    }
});

module.exports = Editor;
