/**
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

attributes: {
    "title": {
        "key": "title",
        "type": "string",
        "autoIncrement": false,
        "unique": true,
        "primaryKey": false,
        "required": true,
        "collection": false
    },
    "duration": {
        "key": "duration",
        "type": "float",
        "autoIncrement": false,
        "unique": false,
        "primaryKey": false,
        "required": false,
        "collection": false
    },
    "Album": {
        "model": "Album"
    }
}

};

