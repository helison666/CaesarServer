'use strict';

(function (This, app) {
	This.Router = Backbone.Router.extend({
		currentUrl: 'Students',

		routes: {
            '': 'initLocation',
			'Students(/)': 'initLocation',
			'Students/Locations(/)': 'openWindowLocations',
            'Students/:location(/)': 'openLocation',
            'Students/:location/:groups(/)': 'openGroupList',
            'Students/:location/:groups/:action(/)': 'openGroupAction',
            'Students/*path': 'notFound'
		},

		subscribes: {
            'Students: stubView-changed': 'navToGroupAction',
            'Students: groups selected': 'navToGroupSelected'
        },

        initialize: function () {
            app.mediator.multiSubscribe(this.subscribes, this);

            this.controller = new This.Controller();

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        initLocation: function () {
            var locations = app.locationsController.getSelectedLocations(),
                arrLocations = locations.join('+');

            app.mediator.publish('Locations: selected', locations);

            this.navigate('Students/' + arrLocations);
        },
        
        openWindowLocations: function () {
             app.locationsController.showLocations();
        },

        openGroupList: function (locations, _groupNames) {
            var arrLocations = locations.split('+'),
                groupNames = _groupNames.split('+'),
                isGroupsExist = this.controller.showGroupViewByRoute(arrLocations, groupNames, 'list');

            if (isGroupsExist) {
                this.navigate('Students/' + locations + '/' + _groupNames + '/list');
            }
        },

        openLocation: function (locations) {
            var arrLocations = locations.split('+');
            this.controller.showLocationByRoute(arrLocations);
        },        

        openGroupAction: function (locations, _groupNames, action) {
            var arrLocations = locations.split('+'),
                groupNames = _groupNames.split('+'),
                isGroupsExist,
                actions = {
                    'list': 'list'
                };

            isGroupsExist = this.controller.showGroupViewByRoute(arrLocations, groupNames, (actions[action] || 'list'));

            if (isGroupsExist) {
                this.navigate('Students/' + locations + '/' + _groupNames + '/' + (actions[action] || 'list'));
            }
        },

        navToGroupAction: function (args) {
            var groupNames, locations, action;

            if (args.groups.length === 1) {
                groupNames = args.groups[0].get('groupKey');
            } else if (args.groups.length > 1) {
                groupNames = args.groups.map(function (group) {
                    return group.get('groupKey');
                });

                groupNames = groupNames.join('+');
            }

            locations = Backbone.history.fragment.split('/')[1];
            action = args.stubView;

            this.navigate('Students/' + locations + '/' + groupNames + '/' + action);
        },

        navToGroupSelected: function (models) {
            var groupsName, locations;

            if (models.length === 1) {
                groupsName = models[0].get('groupKey');
            } else if (models.length > 1) {
                groupsName = models.map(function (group) {
                    return group.get('groupKey');
                });

                groupsName = groupsName.join('+');
            }

            locations = Backbone.history.fragment.split('/')[1];

            if (models.length === 0) {
                this.navigate('Students/' + locations);
            } else {
                this.navigate('Students/' + locations + '/' + groupsName + '/list');
            }
        },

        notFound: function () {
            app.mediator.publish('Error: show-page-404');
        }
	});
})(CS.Students, app);