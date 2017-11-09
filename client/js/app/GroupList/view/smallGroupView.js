'use strict';

(function (This, app) {
    This.SmallGroupView = Backbone.View.extend({
        className: 'small-group-view col-md-6',
        tagName: 'div',
        events: {
            'click': 'select'
        },

        initialize: function () {
            this.model.unCheckGroup();
            this.model.on('destroy', this.remove, this);

            app.mediator.subscribe('Groups: the only selected', this.deselect, {}, this);
            app.mediator.subscribe('SmallGroup: activate', this.selectEl, {}, this);
            app.mediator.subscribe('SmallGroup: deactivate', this.deselect, {}, this);
        },

        render: function () {
            this.$el.html(templates.smallGroupTpl(this.model.toJSON()));
            return this;
        },

        select: function () {
            if (ActivePage.getDescription() === 'Groups') {
                app.mediator.publish('Groups: the only selected', this.model);
                app.mediator.publish('Groups: selected', this.model);
                this.$el.addClass('chosen');
            }

            if (ActivePage.getDescription() === 'Students') {
                this.triggerSelect('Students: groups selected');
            }

            if (ActivePage.getDescription() === 'Schedule') {
                this.triggerSelect('Schedule: groups selected');
            }
        },

        deselect: function() {
            if (this.$el.hasClass('chosen')) {
                this.$el.removeClass('chosen');
            }
        },

        selectEl: function() {
            this.$el.addClass('chosen');
        },

        triggerSelect: function(event) {
            if (this.$el.hasClass('chosen')) {
                this.$el.removeClass('chosen');
                app.mediator.publish('allGroupsBtn: deactivate');
            } else {
                this.$el.addClass('chosen');
            }

            this.model.triggerCheckGroup();
            app.mediator.publish(event, this.model.collection.getCheckedGroups());
        }
    });
})(CS.GroupList, app);