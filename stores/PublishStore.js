var createStore = require('fluxible-app/utils/createStore');

var RequestStore = createStore({
    storeName: 'PublishStore',
    handlers: {
        'NEXT_STEP': 'handleNextStep'
    },
    initialize: function (dispatcher) {
        this.step = 1;
    },
    handleNextStep: function() {
        this.step++;
        this.emitChange();
    },
    getStep: function() {
        return this.step;
    },
    dehydrate: function() {
       return this.step;
    },
    rehydrate: function(state) {
        this.step = state.step;
    }
});

module.exports = RequestStore;
