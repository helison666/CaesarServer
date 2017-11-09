'use strict';
var Rotor = require('rotor-backbone');

var GroupSchedule = Rotor.Model.extend({
	name: 'groupSchedule',
	defaults: {
		    groupId: '',
            groupName: '',
            keyDates: {},
            weeks: {}
	} 
});

module.exports = GroupSchedule;