'use strict';

(function (This, app) {
    This.OneEditStudentItemView = Backbone.View.extend({
        tagName: 'tr',

        template: templates.oneEditStudentItemTpl,

        events: {
            'click .deleteStudent': 'deleteStudent',
            'click .editStudent': 'editStudent',
            'click .download-attachments': 'download'
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        deleteStudent: function () {
            app.mediator.publish('Students: delete-request', this.model);
        },

        editStudent: function () {
            app.mediator.publish('Students: editStudent request', this.model);
        },

        download: function () {
            app.mediator.publish('Students: download-request', this.model);
        }
    });
})(CS.Students, app);