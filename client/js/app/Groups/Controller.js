'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Groups: edit-request': 'showForm',
            'Groups: delete-request': 'delete',
            'Groups: create-request': 'showForm',
            'Locations: selected': 'show',
            'Groups: selected': 'showSelectedGroup',
            'Groups: saved': 'showSelectedGroup',
            'GroupList paginator: page-selected': 'groupsRender',
            'Menu: changed-page': 'deleteView'
        },

        initialize: function () {
            ActivePage.setDescription('Groups');

            this.mediator = app.mediator;
            this.isOpen = true;
            this.$content = $('.content-section');
            this.$sidebar = $('.left-side-bar');
            this.$main = $('.main-section');
        },

        start: function (locations) {
            this.isOpen = true;
            
            app.mediator.publish('Locations: selected', locations);
            
            $('#left-menu').removeClass();
            $('#left-menu').addClass('left-menu-block');
        },

        show: function (locations) {
            var description = ActivePage.getDescription();

            if (description === 'Groups') {
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

        showLocationByRoute: function (arrLocations) {
            this.show();
            if (isLocation(arrLocations)) {
                app.mediator.publish('Error: show-error-page', {
                    elem: this.$main,
                    message: 'such a location is not found'
                });

                return false;
            } else {
                app.mediator.publish('Locations: selected', arrLocations);

                return true;
            }

            function isLocation(locations) {
                var locationSet = [];

                locations.forEach(function (location) {
                    if (store.locations.getNames().indexOf(location) < 0) {
                        locationSet.push(location);
                    }
                });

                return locationSet.length;
            }
        },

        showGroupViewByRoute: function (locations, groupKey, action) {
            var isLocationByRoute,
                group;
                
            isLocationByRoute = this.showLocationByRoute(locations);
            group = app.filter.split('groups', {groupKey: groupKey});
          
            if (isLocationByRoute) {
                if (group) {
                    this.showSelectedGroup(group, action);
                    app.mediator.publish('GroupList: activate groups', [group]);
                } else {
                    app.mediator.publish('Error: show-error-page', {
                        elem: this.$main,
                        message: 'such a group is not found'
                    }); 
                }
            }
        },

        showForm: function (group) {
            var createEditView = new This.CreateEditView(group);

            this.modal(createEditView);
        },

        delete: function (group) {
            var groupDeleteView = new This.GroupDeleteView({
                model: group
            });
            
            this.modal(groupDeleteView);
        },

        showSelectedGroup: function (selected, action) {
            var groupView = new This.GroupView({model: selected});
            
            this.$content.find('.groupName').html(selected.get('name'));
            this.$content.find('.groupStage').html(selected.get('stage'));
            this.$content.find('.groupStageTitle').html('Stage:&nbsp;');

            $('.main-section').html(groupView.render().el);
            groupView.showStubView(action);
        },

        deleteView: function () {
            if (this.isOpen) {
                this.isOpen = false;
                this.contentView.remove();
                this.groupListView.remove();
                this.groupListView.paginatorView.remove();
            }
        },

        // Helpers
        modal: function (view) {
            $('#modal-window').html(view.render().el);
        },
    });
})(CS.Groups, app);