'use strict';
(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {

        },

        initialize: function () {
            this.mediator = app.mediator;
            app.mediator.subscribe('GroupList: activate groups', this.activateGroups.bind(this));
        },

        render: function (locations) {
            
        },

        activateGroups: function (selectedGroups) {
            selectedGroups.forEach( function(group) {
                var groupContainer  = $("div:contains(" + group.get('name') + ")")[5];

                group.checkGroup();
                groupContainer.className += ' chosen';
            });
        }
    });
})(CS.GroupList, app);