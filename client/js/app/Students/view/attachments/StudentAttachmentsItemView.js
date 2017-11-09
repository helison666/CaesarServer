'use strict';

(function (This, app) {
    This.AttachmentsItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'attachment-item',

        template: templates.attachmentsItemTpl,

        events: {
            'mouseover a': 'showInfo',
            'mouseleave a': 'hideInfo'
        },

        render: function () {
            this.$el.html(this.template(this.model));
            this.$nameInfo = this.$el.find('.nameInfo');

            return this;
        },

        showInfo: function () {
            this.$nameInfo.removeClass('hidden');
        },

        hideInfo: function () {
            this.$nameInfo.addClass('hidden');
        }
    });
})(CS.Students, app);