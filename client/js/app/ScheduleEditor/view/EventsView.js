'use strict';
(function (This) {
    This.EventsView = Backbone.View.extend({
        events: {
            'change input:radio': 'changeState'
        },

        initialize: function (groupDirection) {
            this.model = new This.Events(groupDirection);
            this.template = templates.eventsViewTpl;
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        changeState: function (event) {
            var resourceState = {
                    name: 'eventTitle',
                    value: event.target.value
				},
                checkedButtons,
				selectedEvent;

            checkedButtons = this.$el.find('input:radio:checked');
			      selectedEvent = this.extractEventName(checkedButtons[0]);

			      resourceState.value = selectedEvent;

            app.mediator.publish('ScheduleEditor: state changed', resourceState);
        },

		extractEventName: function (el) {
	      return el.id.split('-')[1];
		},

		updateState: function (activity) {
		    this.model.use(activity.title);
			
			if (this.model.isDistributed(activity.title)) {
				this.lockDistribution();
			}
			
		    this.render();
		},
		
		prepareState: function (events) {
			this.model.initState(events);
			
			if (this.model.isDistributed()) {
				this.lockDistribution();
			}
			
			this.render();
		},
		
		lockDistribution: function () {
			app.mediator.publish('Event: skip selection', {
				name: 'eventTitle',
				value: 'Not selected'
			});					
		}
    });
})(CS.ScheduleEditor);
