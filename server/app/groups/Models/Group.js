'use strict';
var Rotor = require('rotor-backbone');

var Group = Rotor.Model.extend({
	name: 'groups',
	defaults: {
            name: '',
            location: '',
            budgetOwner: '',
            direction: '',
            startDate: '',
            finishDate: '',
            teachers: [],
            experts: [],
            stage: '',
            groupKey: 'n/a'
	} ,

});

module.exports = Group;