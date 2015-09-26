var createStore = require('fluxible-app/utils/createStore');
var _ = require('lodash');

var RequestStore = createStore({
    storeName: 'RequestStore',
    handlers: {
        'INFORMATION_UPDATE': 'handleInformationUpdate',
        'SCHEMA_ADDED': 'handleAddSchema',
        //'REMOVE_SCHEMA': 'handleRemoveSchema'
        'ATTRIBUTE_ADDED': 'handleAddAttribute'
    },
    initialize: function (dispatcher) {
        this.request = {
            repoName: "",
            repoDescription: "",
            framework: "sails",
            database: "mongo",
            schemas: [{
                name: "Update-Me",
                attributes: []
            }]
        };
    },
    handleInformationUpdate: function(payload) {
        if (_.has(this.request, payload.path)) {
            _.set(this.request, payload.path, payload.value);
            this.emitChange();
        } else {
            console.log("Did not update info.");
        }
    },
    handleAddSchema: function() {
        this.request.schemas.push({
            name: "Update-Me",
            attributes: []
        });
        console.log(this.request);
        this.emitChange();
    },
    handleAddAttribute: function(payload) {
        this.request.schemas[payload.schemaIndex].attributes.push({
            key: "",
            type: "string",
            autoIncrement: false,
            unique: false,
            primaryKey: false,
            required: false
        });
        this.emitChange();
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
