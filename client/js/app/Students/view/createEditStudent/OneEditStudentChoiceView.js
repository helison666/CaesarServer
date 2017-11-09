'use strict';

(function (This, app) {
    This.OneEditStudentChoiceView = Backbone.View.extend({
        tagName: 'li',
        className: 'group-item',

        template: templates.oneEditStudentChoiceTpl,

        events: {
            'click p': 'select'
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        select: function () {
            app.mediator.publish('Students: crud-request', this.model);
        }
    });
})(CS.Students, app);