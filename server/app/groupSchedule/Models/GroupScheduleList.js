'use strict';

var Rotor = require('rotor-backbone'),
	GroupSchedule = require('./GroupSchedule');

var GroupScheduleList = Rotor.Collection.extend({
	model: GroupSchedule,
    name: 'groupSchedule'
});

module.exports = new GroupScheduleList();