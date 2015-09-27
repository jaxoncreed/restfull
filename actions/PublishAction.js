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
            console.log(res.text);
            context.dispatch('URL_RECEIVED', res.text);
            context.dispatch('NEXT_STEP');
            callback();
        });
}