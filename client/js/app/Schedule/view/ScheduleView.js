
'use strict';

(function (This, app) {
    This.ScheduleView = Backbone.View.extend({
        tagName: 'div',
        className: 'scheduleView',
        
        template: templates.scheduleTpl,
        
        events: {
            'click .editBtn': 'editSchedule',
            'click .monthBtn': function () {this.show('month');},
            'click .weekBtn':  function () {this.show('week');},
            'click .keyDatesBtn': function () {this.show('keyDates')}
        },

        render: function (groups, action) {
            this.$el.html(this.template);

        	if (action === 'info' || !action || action === 'month') {
            	this.show('month', groups);	
        	}

        	if (action === 'week') {
            	this.show('week', groups);	
        	}

        	if (action === 'keyDates') {
            	this.show('keyDates', groups);	
        	}

            return this;
        },
        
        show: function (selected, groups) {
			var $container = this.$el.find('.scheduleContainer'),
				$monthButton = this.$el.find('.monthBtn'),
                $weekButton = this.$el.find('.weekBtn'),
				$keyDatesButton = this.$el.find('.keyDatesBtn'),
				$btn = this.$el.find('.scBtn'),
				schedule = {},
                groupKeyList;

            if (!groups) {
                groups = store.groups.getCheckedGroups();
            }    
                
            this.emptyModel = new CS.Schedule.GroupSchedule();
            groupKeyList = app.filter.split('groups', {groupForKeyList: groups});
            this.scheduleForOneGroup = app.filter.split('groupSchedule', {groupByKeySet: groupKeyList});

			schedule = {
				'month': function () {
					var monthView = new This.MonthView();

					$container.html(monthView.render().el);
					$monthButton.addClass('active');
				}.bind(this),

				'week': function () {
					var	weekView;

				    weekView = new This.WeekView({
		                collection: this.scheduleForOneGroup,
		                model: this.emptyModel
		            });
                    
                    $container.html(weekView.render().el);
					$weekButton.addClass('active');
				}.bind(this),

				'keyDates': function () {
					var keyDatesListView = new This.KeyDatesListView({
						    collection: this.scheduleForOneGroup,
                            model: this.emptyModel
					    });
					
					$container.html(keyDatesListView.render().el);
					$keyDatesButton.addClass('active');
				}.bind(this)
			};

			$btn.removeClass('active');

			
         	app.mediator.publish('Schedule: stubView-changed', {groups: groups, stubView: selected});
           
			
			return schedule[selected]();
        },

        editSchedule: function () {
            var scheduleEditor = app.scheduleEditorController.start();
        }
    });
})(CS.Schedule, app);