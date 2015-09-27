

module.exports = function(context, payload, callback) {
    context.dispatch('ATTRIBUTE_REMOVED', payload);
}