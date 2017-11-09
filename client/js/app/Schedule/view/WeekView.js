'use strict';
(function (This, app) {
    This.WeekView = Backbone.View.extend({
        tagName: 'div',
        className: 'scheduleWeek-view',
        template: templates.scheduleViewTpl,

        subscribes: {
            'Week: selected': 'render'
        },

        initialize: function () {
            var groupNameList,
                emptyWeekList,
                currentWeek,
                weekList,
                day;

            this.currentWeekScheduleSet = []
            currentWeek = '04252016';
            this.week = {};

            if (!this.collection || this.collection.length === 1 && !this.collection[0]) {
                this.render();
                return
            } else {
                weekList = app.filter.split('groupSchedule', {weekList: this.collection});
                emptyWeekList = this.model.get('weeks');
            }

            this.nodeRouter = {'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5};
            this.timeRouter = {'09:00': 'nine', 
                               '09:30': 'nine-half',
                               '10:00': 'ten', 
                               '10:30': 'ten-half', 
                               '11:00': 'eleven',
                               '11:30': 'eleven-half',
                               '12:00': 'twelve',
                               '12:30': 'twelve-half',
                               '13:00': 'thirteen',
                               '13:30': 'thirteen-half',
                               '14:00': 'fourteen',
                               '14:30': 'fourteen-half',
                               '15:00': 'fifteen',
                               '15:30': 'fifteen-half',
                               '16:00': 'sixteen',
                               '16:30': 'sixteen-half',
                               '17:00': 'seventeen',
                               '17:30': 'seventeen-half',
                               '18:00': 'eighteen',
                               '18:30': 'eighteen-half',
                               '19:00': 'nineteen',
                               '19:30': 'nineteen-half',
                               '20:00': 'twenty'
                              };
            this.multiplierStore = {};
            this.multiplier = 0;
         
            weekList.forEach(function (week) {
                if (week) {
                    this.currentWeekScheduleSet.push(week[currentWeek]);
                } else {
                    this.currentWeekScheduleSet.push(emptyWeekList[currentWeek]);
                }
            }.bind(this)); 
        },

        preRender: function () {
          
            for (var day in this.currentWeekScheduleSet[0]) {
                this.week[day] = [];
            }
           
            this.currentWeekScheduleSet.forEach(function(currentWeekSchedule){    
                for (var day in currentWeekSchedule) {
                    if (currentWeekSchedule[day]) {
                        this.week[day].push(currentWeekSchedule[day][0]);
                    }
                }
            }.bind(this));

            
            for (var day in this.week) {
                this.pushToActivityStore(day);
            }
        },

        render: function () {
            this.$el.html(this.template(this.model));

            this.renderIteration();

            return this;
        },

        renderIteration: function () {
            var calculatedMarginLeft,
                activityView,
                activity,
                $div,
                $day,
                day,
                id,
                $a;

            this.preRender();

            for (day in this.week) {    
                
                this.week[day].forEach(function (activity, i) {
                    if (activity.duration) {
                        id = day + i;
                        $div =  this.$el.find('.'+this.timeRouter[activity.startTime]);
                        $day = $($div[0].childNodes[this.nodeRouter[day]]);

                        activityView = new This.ActivityView({model: activity, style:  this.week[day].length});
                        $a = activityView.render().$el;
    					

                        $a.css({
                            'width': (100/this.multiplierStore[id])+'%',
                            'height': (activity.duration*200 + Number(activity.duration)*1.6945)+'%',
                            'border-left': '1px dashed'
                        });

                        calculatedMarginLeft = '0%';

                        // if (this.multiplierStore[id] > 1){
                        //     if (i % 2 !== 0 || i !== 0) {
                        //         calculatedMarginLeft = (100/this.multiplierStore[id])+'%';
                        //     } else {
                        //         calculatedMarginLeft = '0%';
                        //     }
                        // }

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
            };
        },

        pushToActivityStore: function (day) {
            var dayActivityStore;
                
            dayActivityStore = {
                    '09:00': [],
                    '09:30': [],
                    '10:00': [],
                    '10:30': [],
                    '11:00': [],
                    '11:30': [],
                    '12:00': [],
                    '12:30': [],
                    '13:00': [],
                    '13:30': [],
                    '14:00': [],
                    '14:30': [],
                    '15:00': [],
                    '15:30': [],
                    '16:00': [],
                    '16:30': [],
                    '17:00': [],
                    '17:30': [],
                    '18:00': [],
                    '18:30': [],
                    '19:00': [],
                    '19:30': [],
                    '20:00': []
            };
                      
            this.week[day].forEach(function (activity, i) {    
                for (var time in dayActivityStore) {
                    if (this.isLater(time, activity.startTime) && (this.isLater2(this.defineDuration(activity.startTime, activity.duration), time))) {
                        dayActivityStore[time].push(activity);
                    }
                }
            }.bind(this));
            

            this.week[day].forEach(function (activity, i) {      
                var id = day + i;

                this.multiplierStore[id] = this.defineMultiplier(activity, dayActivityStore);

            }.bind(this));
        },

        isLater: function (stringA, stringB) {

            return this.convertToNumber(stringA) >= this.convertToNumber(stringB);
        },

        isLater2: function (stringA, stringB) {

            return this.convertToNumber(stringA) > this.convertToNumber(stringB);
        },

        defineMultiplier: function (activity, store) {
            var max = 0;
            for (var time in store) {
                if (store[time].indexOf(activity) > -1) {
                    var arr = store[time];
                    if (max < arr.length) {
                        max = arr.length;
                    }
                }
            }

            return max;
        },
        
        defineCss: function (multiplier, $div, duration) {
            $div.css({
                'width': (100/multiplier)+'%',
                'height': (duration*200)+'%',
                'margin-top': (duration*200)+'%',
                'margin-left': (multiplier*10)+'%'
            });
        },

        defineDuration: function (str, duration) {
            var convertedToNumberTime = this.convertToNumber(str);

            if (str.substr(3,1) === '3') {
                if (String(duration).length > 1) {
                    convertedToNumberTime+= 70 + String(duration).substr(0,1)* 100;
                } else {
                    convertedToNumberTime+= duration * 100;
                }
            } else {
                if (String(duration).length > 1) {
                    convertedToNumberTime+= 30 + String(duration).substr(0,1)* 100;
                } else {
                    convertedToNumberTime+= duration * 100;
                }
            }
            return this.convertToTimeString(convertedToNumberTime);
        },

        convertToTimeString: function (number) {
            var string = String(number),
                result = '';

            if (string.length === 4) {
                result = string.substr(0,2) + ':' + string.substr(2,2);
            } else {
                result = '0'+ string.substr(0,1) + ':' + string.substr(1,2);
            }

            return result;
        },

        convertToNumber: function (timeString) {
            var string = timeString.replace(':', '');

            return Number(string);
        }
    });
})(CS.Schedule, app);

