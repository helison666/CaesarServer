'use strict';

(function (This, app) {
    This.OneScoreModalStudentListView = Backbone.View.extend({
        tagName: 'tr',

        template: templates.oneScoreModalStudentListTpl,

        events: {

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
})(CS.Students, app);