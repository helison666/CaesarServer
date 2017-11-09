'use strict';
(function (This) {
    This.GroupScheduleList = Backbone.Collection.extend({
        model: This.GroupSchedule,
        url: '/groupSchedule',

        findGroupByName: function (name) {
            var res;

            this.forEach(function (group) {
                if (group.get('groupName') === name) {
                    res = group;
                }
            });
            return res;
        },

        findGroupsByName: function (names) {
            var res = [];

            names.forEach(function (name) {
                if (name) {
                    res = res.concat(this.findWhere({'groupName': name}));
                } else {
                    res.concat(undefined);
                }
            }, this);

           return res;
        },

        findGroupsByGroupKey: function (names) {
            var res = [];

            names.forEach(function (name) {
                if (name) {
                    res = res.concat(this.findWhere({'groupKey': name}));
                } else {
                    res.concat(undefined);
                }
            }, this);

           return res;
        },

        findGroupByGroupKey: function (name) {
            var res;

            this.forEach(function (group) {
                if (group.get('groupKey') === name.groupKey) {
                    res = group;
                }
            });
            return res;
        },

        findGroupsKeyList: function (groups) {
            var groupsKeys = [];

            groups.forEach(function (group) {
                if (group) {
                    groupsKeys.push(group.get('groupKey'));
                } else {
                    groupsKeys.push(undefined);
                }
            });

            return groupsKeys;
        },

        findWeeks: function (groups) {
            var weekList = [];

            groups.forEach(function (group) {
                if (group) {
                    weekList.push(group.get('weeks'));
                } else {
                    weekList.push({});
                }
            }, this);

           return weekList;
        }
    });
})(CS.Schedule);
