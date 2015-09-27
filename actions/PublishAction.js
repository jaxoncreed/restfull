var requester = require('superagent');

module.exports = function(context, payload, callback) {
    context.dispatch('NEXT_STEP');
    requester
        .post('/create')
        .send(payload)
        .end(function(err, res){
            console.log("Error:");
            console.log(err);
            console.log("Res");
            console.log(res);
            context.dispatch('NEXT_STEP');
            callback();
        });
}