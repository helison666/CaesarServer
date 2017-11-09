'use strict';

var Rotor = require('rotor-backbone'),
	Room = require('./Room');

var RoomList = Rotor.Collection.extend({
	model: Room,
    name: 'rooms'
});

module.exports = new RoomList();