'use strict';

(function (This) {
    This.GroupInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'groupInfoView',

        template: templates.groupInfoViewTpl,

        initialize: function () {
            var scheduleForOneGroup,
                groupKey,
                emptyModel;

            
            groupKey = this.model.get('groupKey');
            scheduleForOneGroup = app.filter.split('groupSchedule', {groupKey: groupKey});
            emptyModel = new CS.Schedule.GroupSchedule();

            this.model.on('change', this.render, this);

            this.keyDatesView = new This.GroupKeyDatesView({
                collection: scheduleForOneGroup,
                model: emptyModel
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.toClientJSON()));
            this.$keyDatesEl = this.$el.find('.key-dates');

            this.$keyDatesEl.append(this.keyDatesView.render().el);

            return this;
        }
    });
})(CS.Groups);