'use strict';
(function (This) {
    This.GroupList = Backbone.Collection.extend({
        model: This.Group,
        url: '/groups',

        findMyGroups: function (teacher) {
            return new This.GroupList(this.filter(function (group) {
                return group.isMyTeacher(teacher);
            }));
        },

        findGroupsByStage: function (stage) {
            return new This.GroupList(this.filter(function (group) {
                return group.isMyStage(stage);
            }));
        },

        findGroupsByState: function (state) {
            return new This.GroupList(this.filter(function (group) {
                return group.isMyState(state);
            }));
        },

        findGroupsByLocations: function (locations) {
            return new This.GroupList(this.filter(function (group) {
                return group.isMyLocation(locations);
            }));
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

        findGroupsByGroupKey: function (names) {
            var res = [];

            names.forEach(function (name) {
                if (name) {
                    res = res.concat(store.groups.findWhere({'groupKey': name}));
                } else {
                    res = res.concat(undefined);
                }                
            }, this);

           return res;
        },
        
        findGroupsByGroupName: function (names) {
            var res = [];

            names.forEach(function (name) {
                if (name) {
                    res = res.concat(this.findWhere({'name': name}));
                } else {
                    res = res.concat(undefined);
                }                
            }, this);

           return res;
        },

        findGroupsByRouterName: function (_names) {
            var names = _names.split('+'),
                res = [];

            this.forEach(function (group) {
                names.forEach(function (name) {
                    if (group.get('name') === name) {
                        res.push(group);
                    }
                });
            });

            return res;
        },

        findGroupsNameList: function (groups) {
            var groupsNames = [];

            groups.forEach(function (group) {
                if (group) {
                    groupsNames.push(group.get('name'));
                } else {
                    groupsNames.push(undefined);
                }
            });

            return groupsNames;
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

        findGroupsNames: function () {
            var groupsNames = [];

            this.forEach(function (group) {
                groupsNames.push(group.get('name'));
            });

            return groupsNames;
        },

        findGroupKeysByNames: function (groupsNames) {
            var groupsKeys = [],
                groups;
            
            groups = this.findGroupsByGroupName(groupsNames); 
            groups.forEach(function (group) {
                if (group) {
                    groupsKeys.push(group.get('groupKey'));
                } else {
                    groupsKeys.push(undefined);
                }
            });

            return groupsKeys;
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

        findById: function (id) {
            return this.findWhere({'id': id});
        },

        isNameUnique: function (name) {
            return this.findGroupsNames().indexOf(name) === -1;
        },

        checkGroupsByName: function (_names) {
            var names = _names,
                valid = 0;

            this.forEach(function (group) {
                if (names.indexOf(group.get('name')) >= 0) {
                    valid++;
                }
            });

            return (names.length === valid) ? true : false;
        },

        getCheckedGroups: function () {
            var checkedGroups = [];

            this.forEach(function(group) {
                if (group.get('checked') === true) {
                    checkedGroups.push(group);
                }
            });

            return checkedGroups;
        },        

        unCheckGroups: function () {
            this.forEach(function(group) {
                if (group.get('checked') === true) {
                    group.set('checked', false, {silent: true});
                }
            });
        },

        getCheckedEditGroup: function () {
            var res;

            this.forEach(function(group) {
                if (group.get('checkedForEdit') === true) {
                    res = group;
                }
            });

            return res;
        },

        resetCheckForEdit: function () {
            this.forEach(function (group) {
                if (group.get('checkedForEdit'))
                group.set('checkedForEdit', false);
            }, this);
        },
    });
})(CS.Groups);
