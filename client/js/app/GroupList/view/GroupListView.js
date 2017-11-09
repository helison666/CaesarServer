'use strict';
(function (This, app) {
    This.GroupListView = Backbone.View.extend({
        className: 'group-list-view',
        areMyGroups: false,
        state: 'in-process',

        events: {
            'click .myGroups': 'toggleMyGroups',
            'click .allGroups': 'activateAllGroups',
            'click #endedGroups': function () {this.selectState('finished');},
            'click #currentGroups': function () {this.selectState('in-process');},
            'click #futureGroups': function () {this.selectState('planned');}
        },

        initialize: function() {
            app.mediator.subscribe('Location: selected', this.renderGroups.bind(this));
            app.mediator.subscribe('allGroupsBtn: deactivate', this.deactivateAllGroupsBtn.bind(this));
            app.mediator.subscribe('GroupList: group created', this.selectState.bind(this));
        },

        render: function (locations) {            
            this.$el.html(templates.groupListTpl);
            this.$groupList  = this.$el.find('.group-collection');
            this.$myGroups = this.$el.find('.myGroups');
            this.$allGroups = this.$el.find('.allGroups');
            this.$paginator = this.$el.find('.paginator-place-holder');
            this.createPaginator();
            this.renderGroups(locations);

            return this;
        },

        createPaginator: function () {
            this.paginatorView = new app.PaginatorView({
                pageSize: 10,
                channel: 'GroupList'
            });

            this.$paginator.html(this.paginatorView.render().el);
        },

        renderGroups: function (locations) {
            var $groupCollection = $('.group-collection'),
                defaultGroups,
                locationList = [];

            if (typeof(locations) === 'string') {
                locationList.push(locations);
                locations = locationList;
            }

            this.groupsFilteredByLocations = app.filter.split('groups', {locations: locations});
            this.locations = locations;

            if (ActivePage.getDescription() === 'Groups') {
                app.mediator.publish('Groups: rendered');   
            }             

            if (ActivePage.getDescription() === 'Students') {
                this.$allGroups.css('visibility','visible');
                app.mediator.publish('Students: rendered');   
            }             

            if (ActivePage.getDescription() === 'Schedule') {
                this.$allGroups.css('visibility','visible');
                app.mediator.publish('Schedule: rendered');   
            } 
          
            if (locations) {
                $groupCollection.html('');

                if (this.groupsFilteredByLocations) {
                    this.groupsFilteredByLocations.forEach(this.renderOne, this);
                }
            } else {
                defaultGroups = app.filter.split('groups', {locations:['Dnipro']});

                if (defaultGroups) {
                    defaultGroups.forEach(this.renderOne, this);
                }
            }
        },

        renderOne: function (group) {
            var smallGroupView = new This.SmallGroupView({model: group});

            this.$groupList.append(smallGroupView.render().el);

            return this;
        },

        toggleMyGroups: function () {
            this.$myGroups.toggleClass('pressed');
            this.isMyGroups = !this.isMyGroups;
            app.mediator.publish('MyGroups: selected', this.isMyGroups);
            this.renderGroups(this.locations);
        },

        activateAllGroups: function () {
            var checkedGroups = [];

            this.$allGroups.toggleClass('pressed');

            if (this.$allGroups.hasClass('pressed')) {
                this.groupsFilteredByLocations.forEach(function(group) {
                    group.checkGroup();
                    checkedGroups.push(group);
                    app.mediator.publish('SmallGroup: activate', group);
                }); 
            } else {
                this.groupsFilteredByLocations.forEach(function(group) {
                    group.unCheckGroup();
                    app.mediator.publish('SmallGroup: deactivate', group);
                }); 
            }

            app.mediator.publish(ActivePage.getDescription() + ': groups selected', checkedGroups);
        },

        deactivateAllGroupsBtn: function () {
            this.$allGroups.removeClass('pressed');
        },

        selectState: function (state) {
            this.state = state;
            app.mediator.publish('State: selected', this.state);
            this.renderGroups(this.locations);
        }
    });
})(CS.GroupList, app);
