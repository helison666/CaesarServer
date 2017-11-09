'use strict';
(function (This, app) {
    This.WeekEditorView = Backbone.View.extend({
        tagName: 'div',
        className: 'scheduleEditorWeek-view',
        template: templates.weekViewTpl,

        subscribes: {
            'Week: selected': 'render',
            'WeekView: current state' : 'getCurrentInputsState',
            'Event: checked' : 'addEventExist',
            'NextWeek: selected': 'renderNextWeek',
            'PrevWeek: selected': 'renderPreviousWeek',
            'WeekView: weekView rendered': 'pubNumbersWeeks'
       },

        events: {
            'click': 'addEvent'
        },

        initialize: function () {
            var groupNameList,
                day;

            this.scheduleModel = new This.ScheduleModel(this.collection[0].get('weeks'));   
            this.currentWeekScheduleSet = [];            
            this.currentWeek = this.scheduleModel.getCurrentWeek();
            this.activityList = [];
            this.activity = {};

            app.mediator.multiSubscribe(this.subscribes, this);
        },

        getCurrentInputsState: function (currentState) {
            this.activity = currentState;
        },

        callData: function () {
            app.mediator.publish('ScheduleEditor: get state');
        },

        render: function () {
			this.weekModel = new This.WeekModel(this.scheduleModel.getWeek(this.currentWeek, this.collection[0]));

            this.timeRouter = this.weekModel.timeRouter();
            this.nodeRouter = this.weekModel.nodeRouter();

            this.hourActivityModel = new HourActivityModel();

			this.$el.append(this.template(this.model));

            this.renderDates(this.currentWeek);            
            this.renderIteration();
         
			app.mediator.publish('Week: ready for render', this.week);

            return this;
        },

        addEventExist: function (element, model) {
            var isEqual = false,
                data = element.dataset,
                day = data.day,
                time = data.time,
                activityView, $a,
                activity, calibre;

            this.callData();

            activity = this.initActivity(time);

            isEqual =  this.weekModel.isEqualData(day, time, activity);

            if (!isEqual) {
                activityView = new This.ActivityEditorView({model: activity, style:  this.weekModel.get(day).length});

                this.hourActivityModel.setHourActivity(day, time, activityView);
                this.weekModel.get(day).push(activity);
                this.setActivityCss(day, time);
                
                calibre = this.hourActivityModel.getHourActivity(day, time);
                $a = activityView.render(activity.duration).$el;

                $(element).append($a);
                $(element.firstChild).css({
                    'width': (100/calibre) + '%'
                });

                if ($(element.firstChild).width() < 50) {
                    $(element.firstChild).find('p').remove();
                }

                if ($a.width() < 50) {
                    $a.find('p').remove();
                }
            }
        },

        setActivityCss: function (day, time) {
            var activityList = this.hourActivityModel.getHourActivities(day, time),
                calibre = activityList.length;

            activityList.forEach(function (activityView) {
                activityView.$el.css({
                    'width': (100/calibre) + '%',
                    'height': (activityView.duration*200 + Number(activityView.duration)*1.6945)+'%',
                    'border-left': '1px dashed'
                });
            });
        },

        addEvent: function (evt) {
            var target = evt.target,
                data = target.dataset,
                day = data.day,
                time = data.time,
                isEqualData = false,
                isCrossTime = false,
                lastTime = '21:00',
                $a, activityView,
                activity,calibre, 
                nextCellTime;

            evt.preventDefault();
            evt.stopPropagation();

            this.callData();

            activity = this.initActivity(time);

			if (activity.title === 'Not selected') {
				return;
			}
			
            isCrossTime = this.weekModel.isCrossTime(day, time);

            isEqualData = this.weekModel.isEqualData(day, time, activity);

            if (time === lastTime && Number(activity.duration) >= 1) {
                isEqualData = true;
            }

            if (isCrossTime) {
                isEqualData = true;
            }

            nextCellTime = this.weekModel.getNextCellTime(activity.startTime, activity.duration);

            if (!isEqualData && !this.hourActivityModel.getHourActivities(day, nextCellTime)) {
                activityView = new This.ActivityEditorView({model: activity});

                this.hourActivityModel.setHourActivity(day, time, activityView);
                this.collection[0].set()

                calibre = this.hourActivityModel.getHourActivity(day, time);

                this.weekModel.get(day).push(activity);

                $a = activityView.render(activity.duration).$el;
                $a.css({
                    'width': (100/calibre)+'%',
                    'height': (activity.duration*200 + Number(activity.duration)*1.6945)+'%',
                    'border-left': '1px dashed'
                });

                $(target).append($a);
                
				app.mediator.publish('ScheduleEditor: activity added', activity);
            }

        },

        renderIteration: function () {
            var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                calculatedMarginLeft,
                activityView,
                weekDay,
                $div,
                $day,
                $a;

            days.forEach (function (day) {
                weekDay = this.weekModel.get(day); 

                weekDay.forEach(function (activity, i) {
                    if (activity.duration) {
                        activityView = new This.ActivityEditorView({model: activity, style:  weekDay.length});
                         
                        this.hourActivityModel.setHourActivity(day, activity.startTime, activityView);
                        this.activityList.push(activityView);

                        $div =  this.$el.find('.' + this.timeRouter[activity.startTime]);
                        $day = $($div[0].childNodes[this.nodeRouter[day]]);
                        $a = activityView.render(activity.duration).$el;
                        
                        this.setActivityCss(day, activity.startTime);
                        calculatedMarginLeft = '0%';
                        
                        if (day !== 'thursday'){
                            $a.css({
                                'margin-left': calculatedMarginLeft
                            });
                        }

            			$day.append($a);

            			if ($a.width() < 50) {
            				$a.find('p').remove();
            			}

            			$a.mouseover(function () {
            				var hints = [];

                            if ($a.width() < 50) {
            					$a.attr('name', i);
            					hints.push({
            						name: $a.attr('name'),
            						text: activity.title + ' ' + activity.teacher + ' ' + activity.room
            					});
            				}

                            if (hints !== []) {
            					app.mediator.publish('Message', {
            						type: 'hints',
            						$el: this.$el,
            						hints: hints,
            						coordinates: $a.offset()
            					});
            				}
            			}.bind(this));

            			$a.mouseleave(function () {
            				this.$el.find('.hint').remove();
            			}.bind(this));
                    };

                }.bind(this));
            }.bind(this));   
        },

        initActivity: function (time) {
            var activity = {};

            activity.startTime = time;
            activity.teacher = this.activity['resourceteacher'];
            activity.event = this.activity['event'];
            activity.title = this.activity['eventTitle'];
            activity.room = this.activity['room'];
            activity.duration = '1';

            return activity;
        },

        renderNextWeek: function () {
            var currentWeek = this.scheduleModel.toMomentFormat(this.currentWeek);

            this.currentWeek = moment(currentWeek).add(7, 'days').format('MMDDYYYY');
            this.pubNumbersWeeks();
            this.hourActivityModel.resetHourActivity();

            this.render();
        },

        renderPreviousWeek: function () {
            var currentWeek = this.scheduleModel.toMomentFormat(this.currentWeek);

            this.currentWeek = moment(currentWeek).subtract(7, 'days').format('MMDDYYYY');
            this.pubNumbersWeeks();
            this.hourActivityModel.resetHourActivity();

            this.render();
        },

        renderDates: function (monday) {
            var weekDay,
                currentMonth,
                headerDays,
                currentDay;

            headerDays = this.$el.find('.number-week-wrapper');
            headerDays.each(function (i, elem) {
                weekDay = this.scheduleModel.toMomentFormat(monday);
                weekDay = moment(weekDay).add(i, 'days').format('MMDDYYYY');

                currentMonth = weekDay.slice(0,2);
                currentDay = weekDay.slice(2,4);

                $(elem).find('.month').text(currentMonth);
                $(elem).find('.day').text(currentDay);
            }.bind(this));
        },

        pubNumbersWeeks: function () {
            var weekNumbers = {},
                group = this.collection[0];
                              
            weekNumbers.totalWeekNumber = this.scheduleModel.getTotalWeeks(group);
            weekNumbers.currentWeekNumber = this.scheduleModel.getWeekNumber(this.currentWeek, group);
           
            app.mediator.publish('ScheduleEditor: total weeks', weekNumbers);
        }
    });
})(CS.ScheduleEditor, app);
