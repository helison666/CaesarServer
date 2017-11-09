'use strict';

(function (This) {
    This.KeyDatesView = Backbone.View.extend({
        tagName: 'tr',
        
        template: templates.keyDatesViewTpl,

        render: function () {
           
            this.$el.html(this.template({
            	keyDates: this.model.get('keyDates'), 
            	groupName: this.model.get('groupName')
            }))

            return this;
        }
    });
})(CS.Schedule);