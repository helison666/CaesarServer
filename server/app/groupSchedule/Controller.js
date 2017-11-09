'use strict';
var Rotor = require('rotor-backbone'),
    Controller = Rotor.Controller.extend({
	    collection: require('./Models/GroupScheduleList'),
    });

module.exports = new Controller();