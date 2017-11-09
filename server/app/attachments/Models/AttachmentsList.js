'use strict';

var Rotor = require('rotor-backbone'),
    Attachment = require('./Attachment');

var AttachmentsList = Rotor.Collection.extend({
    model: Attachment,
    name: 'attachments'
});

module.exports = new AttachmentsList();