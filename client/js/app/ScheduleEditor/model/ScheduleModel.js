'use strict';
(function (This) {
	This.ScheduleModel = Backbone.Model.extend({
		getWeek: function (week, group) {
			var schedule = {};

			if (!this.get(week)) {
				schedule = {'monday': [], 
					'tuesday': [], 
					'wednesday': [], 
					'thursday': [], 
					'friday': []
				}

				this.set(week, schedule);
				group.get('weeks')[week] = schedule;
			} else {
				schedule = this.get(week);
			}

			return schedule;
		},

		getTotalWeeks: function (group) {
            var finishDate,
                startDate,
                weekNumber;
 
            finishDate = group.get('keyDates').finish;
            startDate = group.get('keyDates').start;

            weekNumber = this.getDaysBetweenDates(startDate, finishDate);
            weekNumber = Math.ceil(weekNumber/7);

            return weekNumber;
        },

        getDaysBetweenDates: function (prevDate, nextDate) {
            var finishDate,
                startDay,
                diffTime,
                diffDays;

            finishDate = new Date(nextDate.slice(6), Number(nextDate.slice(0,2)) - 1, nextDate.slice(3,5));
            startDay = new Date(prevDate.slice(6), Number(prevDate.slice(0,2)) - 1, prevDate.slice(3,5));
            
            diffTime = finishDate.getTime() - startDay.getTime();
            diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

            return diffDays;
        },

        getWeekNumber: function (monday, group) {
            var currentDate,
                weekNumber,
                totalWeeks,
                startDate;
            
            currentDate = monday.slice(0,2) + '/' + monday.slice(2,4) + '/' + monday.slice(4);
            startDate = group.get('keyDates').start;

            weekNumber = this.getDaysBetweenDates(startDate, currentDate);
            weekNumber = Math.ceil(weekNumber/7);
            totalWeeks = this.getTotalWeeks(group);

            if (weekNumber > totalWeeks) {
                weekNumber = totalWeeks;
            }
             
            if (weekNumber < 0) {
                weekNumber = 0;
            } 

            return weekNumber;
        },

        toMomentFormat: function (date) {
            var formattedDate,
                monthAndDay,
                year;

            year = date.slice(4);
            monthAndDay = date.slice(0,4);

            return formattedDate = year + monthAndDay;
        },

         getCurrentWeek: function () {
            var daysFromMonday,
                currentDate,
                dayOfWeek,
                monday;

            currentDate = new Date(),
            dayOfWeek = currentDate.getDay();
            daysFromMonday = dayOfWeek - 1;
            monday = moment().subtract(daysFromMonday,'days').format('MMDDYYYY');

            return monday;
        }
	}) 
})(CS.ScheduleEditor);