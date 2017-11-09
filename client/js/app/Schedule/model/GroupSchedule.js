'use strict';

(function (This, i) {
    This.GroupSchedule = Backbone.Model.extend({
        defaults: function () {
            return {
                groupKey: '',
                groupName: '',
                keyDates: {
                	'start': '',
		            'demo1': '',
		            'demo2': '',
		            'offering': '',
		            'finish': ''
                },
                weeks: {}
            }
        },

        checkGroupScheduleKey: function (groupName) {
            if (this.get('groupKey') === 'n/a') {
                this.set({'groupKey': groupName});
            }
        },
    });
})(CS.Schedule, i);
