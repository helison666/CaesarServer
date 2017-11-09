'use strict';
(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Locations: selected': 'show',
            'Schedule: groups selected': 'showSchedule',
            'Menu: changed-page': 'deleteView',
            'GroupList paginator: page-selected': 'groupsRender',
            'Schedule: stubView-changed': 'saveAction' 
        },

        initialize: function () {
            this.mediator = app.mediator;

            this.$content = $('#content-section');
            this.$sidebar = $('#left-side-bar');
            this.$main = $('.main-section');
        },

        start: function (locations, groupsName, action) {
            ActivePage.setDescription('Schedule');

            app.mediator.publish('Locations: selected', locations, groupsName, action);
        },

        show: function (locations) {
            var description = ActivePage.getDescription();

            if (description === 'Schedule') {
                if (this.groupListView) {
                    this.deleteView();
                }

                this.contentView = new This.ContentView();
                this.$content.html(this.contentView.render().el);

                this.groupListView = new CS.GroupList.GroupListView();
                this.$sidebar.html(this.groupListView.render(locations).el);

                this.isOpen = true;
                this.locations = locations;
            }
        },

        groupsRender: function () {
            if (this.isOpen) {
                this.groupListView.renderGroups(this.locations);
            }
        },

        showSchedule: function (models) {
            
            this.scheduleView = new This.ScheduleView({collection: models});

            $('.main-section').html(this.scheduleView.render(models, this.action).el);
        },

        showLocationByRoute: function (arrLocations, groupsName, action) {
            var result = false;

            if (!isLocation(arrLocations)) {
                app.mediator.publish('Error: show-error-page', {
                    elem: this.$main,
                    message: 'such a location is not found'
                });
            } else {
                if (this.action) {
                    this.start(arrLocations, groupsName, this.action);
                } else {
                    this.start(arrLocations, groupsName, 'info');
                }

                result = true;
            }

            function isLocation(locations) {
                var arr = [];   

                locations.forEach(function (location) {
                    if (store.locations.getNames().indexOf(location) > 0) {
                        arr.push(location);
                    }
                });

                return arr.length;
            }

            return result;
        },

        showGroupViewByRoute: function (locations, _groupsName, action) {
            var isLocationByRoute, isGroupNameExist,
                groupsName = _groupsName.split('+'),
                groups;

            isLocationByRoute = this.showLocationByRoute(locations, groupsName, action);

            if (isLocationByRoute) {
                this.showSelectedGroups(groupsName, action);
                store.groups.checkGroupsByName(groupsName);
                
                groups = app.filter.split('groups', {groupsName: groupsName});
                app.mediator.publish('GroupList: activate groups', groups);
            } else {
                app.mediator.publish('Error: show-error-page', {
                    elem: this.$main,
                    message: 'such a group is not found'
                 });
            }
        },

        showSelectedGroups: function (selected, action) {
            var groupView = new This.ScheduleView({
                    model: selected
                }),
                groups;

            groups = app.filter.split('groups', {groupsName: selected});
            $('.main-section').html(groupView.render(groups, action).el);
        },

        getGroupList: function (data) {
            return store.groups.findGroupsByLocations(data);
        },

        deleteView: function () {
            if (this.isOpen) {
                this.contentView.remove();
                this.groupListView.remove();
                this.groupListView.paginatorView.remove();
                this.isOpen = false;
            }
        },

        saveAction: function (action) {
            this.action = action.stubView;  
        }
    });
})(CS.Schedule, app);