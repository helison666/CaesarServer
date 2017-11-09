'use strict';

(function (This) {
    This.OneStudentView = Backbone.View.extend({
        tag: 'div',
        className: 'student',
        //template: templates.showStudentTpl,

        events: {
            'click .exit': 'exit' 
        },

        exit: function () {
            // this.remove();... 
        },

        render: function () {
            this.$el.html(this.template(this.model));

            return this;
        }
    });
})(CS.Students);