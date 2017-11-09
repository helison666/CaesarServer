'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'User: edit-request': 'showEditDialog',
            'User: profile-request': 'showProfile'
        },

        initialize: function () {
            this.mediator = app.mediator;

            this.$photoEl = app.domProvider.icon;
            this.$modalEl = app.domProvider.modalWindow;
            this.$menuEl = app.domProvider.rightMenu;

            this.smallUserView = new This.SmallUserView({
                model: app.user
            });
            this.largeUserView = new This.LargeUserView({
                model: app.user,
                el: this.$menuEl
            });

            this.$photoEl.append(this.smallUserView.render().el);
            this.largeUserView.render();
        },

        showEditDialog: function () {
            //add editView here
        },

        showProfile: function () {
            this.largeUserView.show();
        }
    });
})(CS.User, app);