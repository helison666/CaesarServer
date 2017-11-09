'use strict';

(function (This, app) {
    This.OneGroupView = Backbone.View.extend({
        tagName: 'li',
        className: 'group-item',

        template: templates.oneGroupTpl,

        events: {
            'click p': 'toggleCheck',
            'dblclick p': 'select'
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        toggleCheck: function () {
            store.groups.resetCheckForEdit();

            $('.group-item').removeClass('group-item_active');

            this.model.checkForEdit();
            this.$el.addClass('group-item_active');
        },

        select: function () {
            app.mediator.publish('ScheduleEditor: edit-request', this.model);
        }
    });
})(CS.ScheduleEditor, app);