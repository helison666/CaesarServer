'use strict';
(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Menu: Locations': 'showLocations',
            'Groups: saved': 'updateLastGroupNumber',
            'Locations: selected': 'setSelectedLocations',
        },

        initialize: function () {
            this.mediator = app.mediator;
            this.$topMenu = $('#top-menu');
            this.selectedLocations = [app.user.get('location')];
        },

        showLocations: function () {
            var locationListView = new CS.Locations.LocationListView({
                collection: store.locations
            });

            app.modal.fill(locationListView.render().el);
            this.$topMenu.removeClass('open');
        },

        getSelectedLocations: function () {
            return this.selectedLocations;
        },

        setSelectedLocations: function (selectedLocations) {
            this.selectedLocations = selectedLocations;
        },

        updateLastGroupNumber: function (group) {
            var location = {};

            if (group.isNew()) {
                location = store.locations.getByName(group.get('location'));
                location.save('lastGroupNumber', location.get('lastGroupNumber') + 1);
            }
        }
    });
})(CS.Locations, app);