'use strict';
var Rotor = require('rotor-backbone');

var Attachment = Rotor.Model.extend({
    name: 'attachments',
    defaults: {
        "key": "",
        cv: [],
        photo: []
    } 
});

module.exports = Attachment;