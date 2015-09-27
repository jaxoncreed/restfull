var createStore = require('fluxible-app/utils/createStore');

var RequestStore = createStore({
    storeName: 'PublishStore',
    handlers: {
        'NEXT_STEP': 'handleNextStep',
        'URL_RECEIVED': 'handleUrlReceived'
    },
    initialize: function (dispatcher) {
        this.step = 1;
        this.url = "";
    },
    handleNextStep: function() {
        this.step++;
        this.emitChange();
    },
    handleUrlReceived: function(url) {
        this.url = url;
        this.emitChange();
    },
    getStep: function() {
        return this.step;
    },
    getUrl: function() {
        return this.url;
    },
    dehydrate: function() {
        return {
            step: this.step,
            url: this.url
        }
    },
    rehydrate: function(state) {
        this.step = state.step;
        this.url = state.url;
    }
});

module.exports = RequestStore;
