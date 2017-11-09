'use strict';
(function (This, Messenger) {
    This.MainMenuView = Backbone.View.extend({
        tagName: 'div',
        className: 'MainMenu',
        template: templates.MainMenuTpl,
        
        events: {
            'mouseleave': 'hide',
            'mouseover': 'show'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            this.collection.forEach(this.renderOne, this);

            return this;
        },

        renderOne: function (model) {
            this.itemMenu = new This.ItemMenuView({model: model});
            this.$el.find('.containerMainMenu').append(this.itemMenu.render().el);
        },
        
        show: function () {
            this.$el.addClass('open');

            this.$itemMenu = $('.itemMenu');
            this.$itemMenu.addClass('open');

            this.timeBarView = new Messenger.TimeBarView({
                model: new Messenger.Clock()
            });

            $('.flashMessage').html(this.timeBarView.render().el);
        },

        hide: function () {
            this.$el.removeClass('open');
            this.$itemMenu.removeClass('open');
            this.timeBarView.remove();
        }
    });
})(CS.Menu, CS.Messenger);