'use strict';
(function (This, app) {
    This.ItemMenuView = Backbone.View.extend({
        tagName: 'div',
        className: 'itemMenu',

        events: {
            'click': 'openPage'
        },

        render: function () {
            var description = this.model.get('description');

            this.$el.html(templates.ItemMenuTpl(this.model.toJSON()));
            
            return this;
        },

        openPage: function () {
            var $itemMenu = $('.itemMenu'),
                description = this.model.get('description'),
                isLocations = description === 'Locations',
                isGroups = description === 'Groups',
                isActive = ActivePage.getDescription() === description;
            
            if (!isActive || isLocations || isGroups) {
                $itemMenu.removeClass('activeItem');
                this.$el.addClass('activeItem');

                if (!isLocations){
                    ActivePage.setDescription(description);    
                }

                app.mediator.publish('Menu: ' + this.model.get('description'));
                app.mediator.publish('Menu: SelectedPage', this.model.get('description'));
            }
        }     
    });
})(CS.Menu, app);
