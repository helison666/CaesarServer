'use strict';
function HourActivityModel () {
	var hourActivity = {'monday': {}, 
		'tuesday': {}, 
		'wednesday': {}, 
		'thursday': {}, 
		'friday': {}
	};

	this.getHourActivity = function () {
		return hourActivity;	
	};	

	this.setHourActivity = function (day, time, activity) {
        if (hourActivity[day][time]) {
            hourActivity[day][time].push(activity);
        } else {
            hourActivity[day][time] = [];
            hourActivity[day][time].push(activity);
        }
    };

    this.getHourActivities = function (day, time) {
        return hourActivity[day][time];	
    },

    this.getAmountOfActivities = function (day, time) {
        var calibre = 0;

        if (this.hourActivity[day][time]) {
			calibre = hourActivity[day][time].length;
        }

        return calibre;
    };

    this.resetHourActivity = function () {
    	var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    		time;

    	days.forEach(function (day) {
    		for (time in hourActivity[day]) {
    			if (hourActivity[day][time]) {
	    			hourActivity[day][time].forEach(function(view) {
	    				view.$el.remove();
	    			});	
    			}
    		}
    	});
    };
}
