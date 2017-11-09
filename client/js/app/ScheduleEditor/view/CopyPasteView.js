'use strict';
(function (This, app) {
    This.CopyPasteView = Backbone.View.extend({
        template: templates.CopyPasteViewTpl,

    //     initialize: function () {
   

    //     },

        render: function () {
            this.$el.html(this.template());
           
            return this;
        }
    //  app.mediator.publish('ScheduleEditor: state changed', resourceState);
   
    });
})(CS.ScheduleEditor, app);