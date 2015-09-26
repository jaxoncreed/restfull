
module.exports = function(context, payload, callback) {
    context.dispatch("INFORMATION_UPDATE", payload);
}