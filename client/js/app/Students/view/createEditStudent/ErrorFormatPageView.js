'use strict';
(function (This)  {
    This.ErrorFormatPageView = Backbone.View.extend({
        className: 'modal-wrapper',
        tpl: templates.errorFormatPageViewTpl,

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
})(CS.Students);