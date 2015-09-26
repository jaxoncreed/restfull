var createStore = require('fluxible-app/utils/createStore');
var _ = require('lodash');

var RequestStore = createStore({
    storeName: 'RequestStore',
    handlers: {
        'INFORMATION_UPDATE': 'handleInformationUpdate',
        //'ADD_SCHEMA': 'handleAddSchema',
        //'REMOVE_SCHEMA': 'handleRemoveSchema'
    },
    initialize: function (dispatcher) {
        this.request = {
            repoName: "",
            repoDescription: "",
            framework: "sails",
            database: "mongo",
            schemas: []
        };
    },
    handleInformationUpdate: function(payload) {
        if (_.has(this.request, payload.path)) {
            _.set(this.request, payload.path, payload.value);
            this.emitChange();
        }
    },
    getRequest: function() {
        return this.request;
    },
    dehydrate: function() {
       return this.request;
    },
    rehydrate: function(state) {
        this.request = state.request;
    }
});

module.exports = RequestStore;
