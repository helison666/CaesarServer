'use strict';

(function (This, app) {
    This.KeyDatesListView = Backbone.View.extend({
        tagName: 'table',
        className: 'keydates-schedule',

        template: templates.keyDatesListViewTpl,

        render: function () {
            var keyDatesView;

            this.$el.html(this.template);
            this.$tbody = this.$el.find('tbody');
            
            if (!this.collection || this.collection.length === 1 && !this.collection[0]) {
                keyDatesView = new This.KeyDatesView({
                    model: this.model
                });
                
                this.$tbody.append(keyDatesView.render().el);
            } else {
                this.collection.forEach( function (keyDates) {
                    if (keyDates) {
                        keyDatesView = new This.KeyDatesView({
                            model: keyDates
                        });
                    } else {
                        keyDatesView = new This.KeyDatesView({
                        model: this.model
                });
                    }    
                
                    this.$tbody.append(keyDatesView.render().el);
                }.bind(this));
            }

            return this;
        }
    });
})(CS.Schedule, app);