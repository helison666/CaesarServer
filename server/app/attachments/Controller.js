'use strict';
var Rotor = require('rotor-backbone'),
    Controller = Rotor.Controller.extend({
       collection: require('./Models/AttachmentsList'),
    });

module.exports = new Controller();