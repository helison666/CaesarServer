'use strict';
var Rotor = require('rotor-backbone');

var Room = Rotor.Model.extend({
	name: 'rooms',
	defaults: {
        'location': '',
        'numbers': []
    } 
});

module.exports = Room;