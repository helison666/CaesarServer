'use strict';
(function (This, app) {
    This.EditStudentListChoiceView = Backbone.View.extend({
        tagName: 'div',
        className: 'editGroupWindow',
        $documentEl: $(document),

        template: templates.editStudentListChoiceTpl,

        events: {
            'click .cancel': 'close',
        },

        initialize: function () {
            _.bindAll(this, 'onKeyPress');
            this.$documentEl.bind('keydown', this.onKeyPress);

            this.listenTo(store.groups, 'change:checkedForEdit', this.toggleSaveBtnEl);
        },

        render: function () {
            this.$el.html(this.template());
            this.$saveBtnEl = this.$el.find('.save');
            this.$ul = this.$el.find('ul');

            this.collection.forEach(function (group) {
                var groupForEdit = new This.OneEditStudentChoiceView({
                    model: group
                });

                this.$ul.append(groupForEdit.render().el);
            }, this);

            return this;
        },

        onKeyPress: function (e) {
            var keyCode = e.keyCode;

            if (keyCode === System.constants.ESC) {
                this.remove();
            }
        },

        onClose: function () {
            this.$documentEl.unbind('keydown', this.onKeyPress);

            this.remove();
        },

        close: function () {
            this.onClose();
        }
    });
})(CS.Students, app);