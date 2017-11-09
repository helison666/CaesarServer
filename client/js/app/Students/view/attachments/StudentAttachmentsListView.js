'use strict';
(function (This, app) {
    This.AttachmentsListView = Backbone.View.extend({
        tagName: 'div',
        className: 'downloadAttachmentsWindow',
        $documentEl: $(document),

        template: templates.attachmentsListViewTpl,

        events: {
            'click .cancel': 'close',
        },

        initialize: function () {
            _.bindAll(this, 'onKeyPress');
            this.$documentEl.bind('keydown', this.onKeyPress);
        },

        render: function () {
            this.$el.html(this.template());
            this.$ul = this.$el.find('ul');

            this.collection.forEach(function (attachments) {
                attachments.get('cv').forEach (function (cv) {
                    var view = new This.AttachmentsItemView({
                        model: cv
                    });

                    this.$ul.append(view.render().el);
                }, this);

                attachments.get('photo').forEach(function (photo) {
                    var view = new This.AttachmentsItemView({
                        model: photo
                    });

                    this.$ul.append(view.render().el);
                }, this);
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

            app.mediator.publish('Students: crud-request');
        },

        close: function () {
            this.onClose();
        }
    });
})(CS.Students, app);