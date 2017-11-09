'use strict';

(function (This) {
    This.GroupKeyDatesView = Backbone.View.extend({
        tagName: 'table',

        template: templates.groupKeyDatesViewTpl,

        events: {
            'click tbody td': 'selectKeyDate'
        },

        render: function () {
            var keyDates;

            if (this.collection && this.collection[0]) {
                keyDates = this.collection[0].get('keyDates');
            } else {
                keyDates = this.model.get('keyDates');
            }
            
            this.$el.html(this.template({keyDates: keyDates}));

            return this;
        },

        selectKeyDate: function (e) {
            console.log(e.target.innerText);
            // app.mediator.publish('KeyDate selected', e.target.innerText);
        }
    });
})(CS.Groups);