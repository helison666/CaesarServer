'use strict';
(function (This, app) {
    This.GroupsSelectorView = Backbone.View.extend({
        tagName: 'div',
        className: 'editGroupWindow',
        $documentEl: $(document),

        template: templates.groupsSelector,

        events: {
            'click .save': 'select',
            'click .cancel': 'close',
        },

        initialize: function () {
            this.chosenGroup;

            _.bindAll(this, 'onKeyPress');
            this.$documentEl.bind('keydown', this.onKeyPress);

            this.listenTo(store.groups, 'change:checkedForEdit', this.toggleSaveBtnEl);
        },

        render: function () {
            this.$el.html(this.template());
            this.$saveBtnEl = this.$el.find('.save');
            this.$ul = this.$el.find('ul');

            this.collection.forEach(function (group) {
                var groupForEdit = new This.OneGroupView({
                    model: group
                });

                this.$ul.append(groupForEdit.render().el);
            }, this);

            return this;
        },

        onKeyPress: function (e) {
            var keyCode = e.keyCode;

            if (keyCode === System.constants.ENTER) {
                this.select();
            }

            if (keyCode === System.constants.ESC) {
                this.remove();
            }
        },

        toggleSaveBtnEl: function () {
            this.$saveBtnEl.prop('disabled', false)
                .removeClass('disabled');
        },

        select: function () {
            var group = store.groups.getCheckedEditGroup();

            app.mediator.publish('ScheduleEditor: edit-request', group);

            this.onClose();
        },

        onClose: function () {
            this.$documentEl.unbind('keydown', this.onKeyPress);

            this.remove();
        },

        close: function () {
            this.onClose();
        },

        highLightCheckedLocs: function() { 
            this.chosenGroup.$el.addClass('active-location');
        }
    });
})(CS.ScheduleEditor, app);