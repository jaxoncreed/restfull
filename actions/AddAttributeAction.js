
module.exports = function(context, payload, callback) {
    context.dispatch("ATTRIBUTE_ADDED", payload);
}