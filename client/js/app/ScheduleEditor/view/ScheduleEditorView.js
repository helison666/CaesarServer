'use strict';
(function (This, app) {
    This.ScheduleEditorView = Backbone.View.extend({
        tagName: 'section',
        className: 'backdrop',
        template: templates.scheduleEditorTpl,
        selectionState: {
            resourceteacher: '',
            room: '',
            event: '',
            eventTitle: ''
        },

        subscribes: {
            'ScheduleEditor: state changed': 'changeSelectionState',
            'ScheduleEditor: get state': 'getSelectionState',
            'ScheduleEditor: activity added': 'refreshResourses',
            'ScheduleEditor: total weeks': 'renderNumberWeeks',
			'Week: ready for render': 'prepareResourses',
			'Event: skip selection': 'changeSelectionState'
        },

        events: {
            'click #save': 'save',
            'click #cancel': 'close',
            'click .nextWeek': 'pubNextWeek',
            'click .prevWeek': 'pubPrevWeek'
        },

        initialize: function () {
            $(document).on('keydown', this.keyEvent.bind(this));
            app.mediator.multiSubscribe(this.subscribes, this);

            this.groupName = this.model.get('name');
            this.groupKey= this.model.get('groupKey');
            this.teachers = this.model.get('teachers');
            this.groupLocation = this.model.get('location');
            this.groupDirection = this.model.get('direction');
            this.rooms = app.filter.split('rooms', {roomsByLocation: this.groupLocation});
        },

        render: function () {
            var scheduleCollection,
                schedule,
                emptyModel;

            this.$el.html(this.template({name: this.groupName}));
            this.$resoureViewContainer = this.$el.find('.resourceView');
            this.$eventsViewContainer =  this.$el.find('.eventsView');
            this.$weekViewContainer =  this.$el.find('.weekView');
            this.$copyPasteViewContainer =  this.$el.find('.copyPastView');


            this.resourceView = new This.ResourceView(this.teachers, this.rooms);
            this.eventsView = new This.EventsView(this.groupDirection);

            scheduleCollection = app.filter.split('groupSchedule', {groupKey: this.groupKey});
            emptyModel = new CS.Schedule.GroupSchedule();
            emptyModel.set({'groupKey': this.groupKey});

            if (!scheduleCollection[0]) {
                store.groupSchedule.add(emptyModel);
                scheduleCollection[0] = emptyModel;
            }

            this.weekView = new This.WeekEditorView({
                collection: scheduleCollection,
                model: emptyModel
            });
            this.copyPasteView = new This.CopyPasteView({});

            this.$resoureViewContainer.html(this.resourceView.render().el);
            this.$eventsViewContainer.html(this.eventsView.render().el);
            this.$weekViewContainer.html(this.weekView.render().el);
            this.$copyPasteViewContainer.html(this.copyPasteView.render().el);
           
            app.mediator.publish('WeekView: weekView rendered');

            this.selectionState = {
                resourceteacher: this.$el.find('[name="resourceteacher"]').val(),
                room: this.$el.find('[name="room"]').val(),
                event: this.$el.find('[name="event"]').val(),
                eventTitle: 'Not selected'
            };

            return this;
        },

        changeSelectionState: function (state) {
            this.selectionState[state.name] = state.value;
        },

        getSelectionState: function () {
            app.mediator.publish('WeekView: current state', this.selectionState);
        },

		refreshResourses: function (activity) {
		    this.eventsView.updateState(activity);
		},

		prepareResourses: function (week) {
		    var events = this.extractEvents(week);
			
			this.eventsView.prepareState(events);  
		},
		
		extractEvents: function (week) {
			var events = [];
			
			_.forEach(week, function (day) {
				_.forEach(day, function (activity) {
					events.push(activity.title);
				});
			});
			
			return events;
		},
		
        keyEvent: function(event) {
            if (event.which === System.constants.ENTER) {
                this.save();
            } else if (event.which === System.constants.ESC) {
                this.close();
            }
        },

        save: function () {
            this.close();
        },

        close: function () {
            $(document).off('keydown');
            $(document).off('click');
            this.remove();
        },

        pubNextWeek: function () {
            app.mediator.publish('NextWeek: selected');
        },

        pubPrevWeek: function () {
            app.mediator.publish('PrevWeek: selected');
        },
        
        renderNumberWeeks: function(weeksNumbers) {
            this.$weekViewContainer.find('.week-pages').empty();
            this.$weekViewContainer.append(templates.weekViewPagesTpl(weeksNumbers));
        }
    });
})(CS.ScheduleEditor, app);
