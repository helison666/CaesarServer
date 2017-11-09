'use strict';

(function (This, app) {
    This.OneStudentView = Backbone.View.extend({
        tagName: 'tbody',

        className: 'tableBodyStudents',

        template: templates.oneStudentViewTpl,

        render: function () {
            this.$el.append(this.template(this.model.toJSON()));

            return this;
        }
    });
})(CS.Students, app);