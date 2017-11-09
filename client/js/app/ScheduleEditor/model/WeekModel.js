'use strict';
(function (This) {
	This.WeekModel = Backbone.Model.extend({			 
		isEqualData: function (_day, time, newActivity) {
	    	var activityList = this.get(_day),
		        timeActivityList = [],
		        isEqual = false,
		        day = this.get(_day),
		        activity;

	    	activityList.forEach(function (activity) {
	            if (activity.startTime === time) {
	            	timeActivityList.push(activity);
	            }
	        });        

	        timeActivityList.forEach(function (activity) {
	            if (activity.room === newActivity.room || activity.teacher === newActivity.teacher) {
	            	isEqual = true;
	            }
	        });

	        for(activity in day) {
            	if ((activity.teacher === newActivity.teacher || activity.room === newActivity.room) && activity.startTime=== newActivity.startTime) {
                    isEqual = true;
                }
            }

	        return isEqual;	       
	    },

	    isCrossTime: function (day, time) {
            var dayActivityList = this.get(day),
                isCross = false,
                startTime = 0,
                activityTime = 0,
                newTime = 0;

           
            dayActivityList.forEach((function (activity) {
                startTime = parseInt(activity.startTime.split(':').join(''));
                activityTime = parseInt(this.getNextCellTime(activity.startTime, activity.duration).split(':').join(''));
                newTime = parseInt(time.split(':').join(''));

                if (newTime <= activityTime && newTime >= startTime) {
                    isCross = true;
                }
            }).bind(this));
            

            return isCross;
        },

        getNextCellTime: function (startTime, _duration) {
            var duration = (Number.parseInt(_duration) * 2) - 1,
                nextCellTime = startTime,
                i;

        	for (i = 0; i < duration; i++) {
            	nextCellTime = this.oneDurationIteration(nextCellTime);
          	}

          	return nextCellTime;
        },

        oneDurationIteration: function (startTime) {
            var nextCellTime = startTime.split(':');

            if (nextCellTime[1] === '30') {
                nextCellTime[0] = Number.parseInt(nextCellTime[0]) + 1;
                nextCellTime[1] = '00';

                if (nextCellTime[0] < 10) {
                    nextCellTime[0] = '0' + nextCellTime[0];
                }

            } else if (nextCellTime[1] === '00') {
                nextCellTime[1] = '30';
            }

            return nextCellTime[0] + ':' + nextCellTime[1];
        },

        timeRouter: function () {
        	return {'09:00': 'nine',
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
        },

        nodeRouter: function () {
        	return {'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5};		
        } 
	}) 
})(CS.ScheduleEditor);