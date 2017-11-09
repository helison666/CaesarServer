'use strict';

(function (This, i) {
    This.Events = Backbone.Model.extend({
        eventSet: {
		    dev: ['Practice*8', 'Weekly report*2', 'Work with Expert*1'],
			qc: ['Lecture*4', 'Weekly report*2', 'Work with Expert*2', 'Consultation*2']
		},

		directionLink: {
			MQC: 'qc',
			ISTQB: 'qc',
			Other: 'dev'
		},

		state: {},

		initialize: function (groupDirection) {
			this.events = this.findLinkedEvents(groupDirection);
			this.initState();
        },

		findLinkedEvents: function (direction) {
			var events = [];

			for (let link in this.directionLink) {
				if (link === direction) {
					let target = this.directionLink[link];
					events = this.eventSet[target];
					break;
				}
			}

			if (!events.length) {
				let target = this.directionLink['Other'];
				events = this.eventSet[target];
			}

			return events;
		},

		initState: function (defaults) {
            this.state = {};
      		
			_.forEach(this.events, function (description) {
				var options = description.split('*'),
				    event = {};

				event.name = options[0];
				event.load = options[1];
				event.used = 0;

				this.state[event.name] = event;
			}, this);
			
			if (defaults) {
				this.apply(defaults);
			}
		},

		use: function (eventName) {
			this.state[eventName].used++;
		},
		
		apply: function (events) {
			_.forEach(events, function (eventName) {
			    if (this.state[eventName]) {
				    this.state[eventName].used++;
				}
			}, this);
		},

		isDistributed: function (eventName) {
			var resolution = false;
			
			if (eventName) {
				let eventState = this.state[eventName];
				resolution = (eventState.used < eventState.load)? false: true;
			} else {
			    resolution = this.toJSON().events.length? true: false;
			}
			
			return resolution;
		},
		
		toJSON: function () {
			var json = {
				events: []
			};

			_.forEach(this.state, function (eventState) {
				if (eventState.used < eventState.load) {
			        json.events.push(eventState);
				}
			}, this);

		    return json;
		}
    });
})(CS.ScheduleEditor, i);
