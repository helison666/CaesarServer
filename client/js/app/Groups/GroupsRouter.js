'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({
        currentUrl: 'Groups',

        subscribes: {
            'Groups: selected': 'navToGroupSelected',
            'Groups: stubView-changed': 'navToGroupAction',
            'Groups: crud-request': 'navToShowRequest',
            'Groups: delete-group': 'navToDeleteGroup',
            'Groups: saved': 'navToSaveGroup',
            'Groups: dialog-closed': 'navToCancelForm'
        },

        routes: {
            '': 'initLocation',
            'Groups(/)': 'initLocation',
            'Groups/Locations(/)': 'openWindowLocations',
            'Groups/:location(/)': 'openLocation',
            'Groups/:location/:group(/)': 'openGroupInfo',
            'Groups/:location/:group/:action(/)': 'openGroupAction',
            'Groups/:location/:group/:action/:crud(/)': 'opencommandCrud',
            'Groups*path': 'notFound'
        },

        initialize: function () {
            app.mediator.multiSubscribe(this.subscribes, this);
            this.controller = new This.Controller();
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navToGroupSelected: function (model) {
            var groupName = model.get('name'),
                location = Backbone.history.fragment.split('/')[1];
                
            this.navigate('Groups/' + location + '/' + groupName + '/info');
        },

        navToGroupAction: function (args) {
            var groupName = args.group.get('name'),
                location = args.group.get('location'),
                action = args.stubView; /**rename stub**/

            this.navigate('Groups/' + location + '/' + groupName + '/' + action);
        },

        navToShowRequest: function (crud) {
            this.currentUrl = window.location.pathname;
            this.navigate(this.currentUrl + '/' + crud);
        },

        navToCancelForm: function () {
            var previousUrl;

            this.currentUrl = window.location.pathname;
            previousUrl = this.currentUrl.split('/');
            previousUrl.pop();
            this.navigate(previousUrl.join('/'));
        },

        navToDeleteGroup: function () {
            this.navigate(this.currentUrl.split('/', 3).join('/'));
        },

        navToSaveGroup: function (model) {
            var groupName = model.get('name'),
                location = model.get('location');
                
            this.navigate('Groups/' + location + '/' + groupName + '/info');
        },

        initLocation: function () {
            var locations = app.locationsController.getSelectedLocations(),
                arrLocations = locations.join('+');

            this.controller.start(locations);
            this.navigate('Groups/' + arrLocations);
        },

        openLocation: function (locations) {
            var arrLocations = locations.split('+');

            this.controller.showLocationByRoute(arrLocations);
        },

        openGroupInfo: function (locations, groupName) {
            var arrLocations = locations.split('+'),
                modelGroup = this.controller.showGroupViewByRoute(arrLocations, groupName, 'info');

            if (modelGroup) {
                this.navigate('Groups/' + locations + '/' + groupName + '/info');
            }
        },

        opencommandCrud: function (locations, groupName, action, crud) {
            var arrLocations = locations.split('+'),
                modelGroup = this.controller.showGroupViewByRoute(arrLocations, groupName, action),
                cruds = {
                    'delete': function (modelGroup) {
                        if (modelGroup) {
                            this.controller.delete(modelGroup);
                        }
                    }.bind(this),

                    'create': function () {
                        this.controller.showForm();
                    }.bind(this),

                    'edit': function (modelGroup) {
                        if (modelGroup) {
                            this.controller.showForm(modelGroup);
                        }
                    }.bind(this)
                };
                
            if (cruds[crud] && (!app.user.isRole('Coordinator')) && (!app.user.isRole('Teacher')) || (app.user.isRole('Coordinator')) && (app.user.isLocation(locations))) {
                cruds[crud](modelGroup);
                this.currentUrl = window.location.pathname;
            } else if ((app.user.isRole('Teacher')) && (app.user.isLocation(locations))) {
                var teachersgGoups = store.groups.findMyGroups(app.user.getShortName()).models;
                teachersgGoups.forEach(function (models) {
                    if (models.attributes.name==groupName) {
                        cruds[crud](modelGroup);
                    } 
                });
             } else {
                  app.mediator.publish('Error: show-page-404');
             }
        },

        openGroupAction: function (locations, groupName, action) {
            var arrLocations = locations.split('+'),
                actions = {
                    'info': true,
                    'students': true,
                    'shedule': true,
                    'message': true
                };

            if (actions[action]) {
                this.controller.showGroupViewByRoute(arrLocations, groupName, action);
            } else {
                this.controller.showGroupViewByRoute(arrLocations, groupName, 'info');
            }
        },

        openWindowLocations: function () {
            app.locationsController.showLocations();
        },

        notFound: function () {
            app.mediator.publish('Error: show-page-404');
        }
    });
})(CS.Groups, app);
