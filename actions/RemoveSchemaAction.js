

module.exports = function(context, payload, callback) {
    context.dispatch('SCHEMA_REMOVED', payload);
}