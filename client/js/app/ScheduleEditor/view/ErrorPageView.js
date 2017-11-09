'use strict';
(function (This)  {
    This.ErrorPageView = Backbone.View.extend({
        className: 'modal-wrapper',
        tpl: templates.ScheduleEditorErrorTpl,

        events: {
            'click .save': 'close'
        },

        render: function () {
            this.$el.html(this.tpl());
            
            return this;
        },

        close: function () {
            this.remove();
        }
    });
})(CS.ScheduleEditor);