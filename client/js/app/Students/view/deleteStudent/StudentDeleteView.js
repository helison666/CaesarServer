'use strict';

(function (This) {
    This.StudentDeleteView = Backbone.View.extend({
        tagName: 'div',
        className: 'modal-wrapper',
        template: templates.studentDeleteViewTpl,
        documentEl: $(document),
        events: {
            'click .btn-delete': 'deleteGroup',
            'click .btn-cancel': 'close'
        },

        initialize: function () {
            _.bindAll(this, 'onKeyPress');
            this.documentEl.bind('keydown', this.onKeyPress);
        },

        render: function () {
            this.$el.append(this.template(this.model.toJSON()));
            
            return this;
        },

        deleteGroup: function () {
            this.model.destroy();
            this.documentEl.unbind('keydown', this.onKeyPress);
            app.mediator.publish('Students: crud-request');
            this.remove();
        },

        close: function () {
            app.mediator.publish('Students: crud-request');
            this.documentEl.unbind('keydown', this.onKeyPress);
            this.remove();
        },

        onKeyPress: function (e) {
            if (e.keyCode === System.constants.ESC) {
                this.close();
            }

            if (e.keyCode === System.constants.ENTER) {
                this.deleteGroup();
            }
        }
    });
})(CS.Students);