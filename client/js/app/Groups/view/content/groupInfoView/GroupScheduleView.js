'use strict';

(function (This) {
    This.GroupScheduleView = Backbone.View.extend({
        tagName: 'div',
        className: 'schedule-container',

        template: templates.groupScheduleViewTpl,

        initialize: function () {
            var scheduleForOneGroup,
                emptyModel,
                groupKey;

            groupKey = this.model.get('groupKey');
            scheduleForOneGroup = app.filter.split('groupSchedule', {groupKey: groupKey});
            emptyModel = new CS.Schedule.GroupSchedule(); 

            this.weekView = new CS.Schedule.WeekView({
                collection: scheduleForOneGroup,
                model: emptyModel
            });
           
            this.groupKeyDatesView = new This.GroupKeyDatesView({
                collection: scheduleForOneGroup,
                model: emptyModel
            });
        },

        render: function () {
            this.$el.html(this.template);
            this.$weekEl = this.$el.find('.week-wrapper');
            this.$keyDatesEl = this.$el.find('.key-dates-wrapper');

            this.$weekEl.html(this.weekView.render().el);
            this.$keyDatesEl.html(this.groupKeyDatesView.render().el);

            return this;
        }
    });
})(CS.Groups);
