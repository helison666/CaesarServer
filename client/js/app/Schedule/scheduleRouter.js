'use strict';
(function (This, app)  {
    This.Router = Backbone.Router.extend({
        subscribes: {
           'Schedule: groups selected': 'navToGroupSelected',
           'Schedule: stubView-changed': 'navToGroupAction' 
        },

        routes: {    
            'Schedule(/)': 'showPageSchedule',
            'Schedule/Locations(/)': 'openWindowLocations',
            'Schedule/:location(/)': 'openLocation',
            'Schedule/:location/:group(/)': 'openGroupInfo',
            'Schedule/:location/:group/:action(/)': 'openGroupAction',
            'Schedule*path': 'notFound' 
        },

        initialize: function () {
            app.mediator.multiSubscribe(this.subscribes, this);

            this.controller = new This.Controller();
            Backbone.history.loadUrl(Backbone.history.fragment);    
        },

        showPageSchedule: function () {
            var locations = app.locationsController.getSelectedLocations();

            this.controller.start(locations);

            this.navigate('Schedule/' + locations.join('+'));
        },

        openWindowLocations: function () {
             app.locationsController.showLocations();
        },

        openLocation: function (locations) {
            var locations = locations.split('+');

            this.controller.start(locations);

            this.controller.showLocationByRoute(locations);
        }, 

        openGroupInfo: function (locations, groupsName) {
            var arrLocations = locations.split('+'),
                modelGroup = this.controller.showGroupViewByRoute(arrLocations, groupsName, 'info');

            if (modelGroup) {
                this.navigate('Schedule/' + locations + '/' + groupsName + '/info');
            }
        }, 

        openGroupAction: function (locations, groupsName, action) {
            var arrLocations = locations.split('+');
                
            this.controller.showGroupViewByRoute(arrLocations, groupsName, this.action);
        }, 

        navToGroupSelected: function (modelList) {
            var location = Backbone.history.fragment.split('/')[1],            
                groups = [];

            if (modelList.length === 0) {           
                groups = modelList.map(function (group) {
                    return group.get('groupKey');
                });
            }
        },
 
        navToGroupAction: function (args) {
            var location = Backbone.history.fragment.split('/')[1],
                groups; 
            
            this.action = args.stubView;
            if (args.groups){
                if (args.groups.length) {
                    groups = args.groups.map(function (group) {
                        return group.get('groupKey');
                    });
                    this.navigate('Schedule/' + location + '/' + groups.join('+') + '/' + this.action);
                } else {
                    this.navigate('Schedule/' + location); 
                }
            } else {
                this.controller.start('Dnipro');
            }
            
        },

        notFound: function () {
            app.mediator.publish('Error: show-page-404');
        }       
    });
})(CS.Schedule, app);