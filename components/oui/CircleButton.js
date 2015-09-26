var React = require('react');

var CircleButton = React.createClass({
    propTypes: {
        action: React.PropTypes.func.isRequired,
        payload: React.PropTypes.object.isRequired,
        actionId: React.PropTypes.string
    },
    contextTypes: {  
        executeAction: React.PropTypes.func.isRequired,
    }, 
    navigate: function() {
        this.context.executeAction(this.props.action, this.props.payload);
    },
    render: function() {
        var loading;
        if (typeof this.props.currentlyLoading[this.props.actionId]  !== "undefined") {
            loading = "Loading";
        }
        return (
            <div className="o-circle-button" onClick={this.navigate}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = CircleButton;