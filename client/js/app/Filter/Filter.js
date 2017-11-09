'use strict';
(function (This, app) {
    This.Filter = function () {
        var groupListParams = {
                state: 'in-process',
                isMyGroups: false,
                locations: [],
                page: 0,
                lastPage: 0,
                pageSize: 10
            },
            subscribes = {
                'GroupList paginator: page size defined': onPageChange,
                'GroupList paginator: page-selected': onPageSelected,
                'MyGroups: selected': onMyGroups,
                'State: selected': onStateChange
            };

        app.mediator.multiSubscribe(subscribes, this);

        function onPageSelected (value) {
            groupListParams.page = value;
        }

        function onPageChange (value) {
            groupListParams.pageSize = value;
        }

        function onStateChange (value) {
            groupListParams.state = value;
        }

        function onMyGroups (value) {
            groupListParams.isMyGroups = value;
        }

        this.split = function (collectionName, options) {
            var dataList = {},
                groupNameScheduleList,
                myMainGroupsNames,
                mainGroupsChecked,
                stateMainGroups,
                groupsByLocation,
                groupsByName,
                myMainGroups,
                groupsKey;

            dataList = store[collectionName];

            if (!dataList) {
                dataList = i[collectionName];
            }

            if (collectionName === 'students') {
                if (_.isArray(options)) {
                    dataList = dataList.findStudentsByGroups(options);
                } else if (_.isObject(options)) {
                    dataList = dataList.findStudentsByGroupKey(options.get('groupKey'));
                }
            }

            if (collectionName === 'attachments') {
                dataList = dataList.findAttachmentsByStudent(options)[0];
            }
            
            if (collectionName === 'rooms') {
                options.roomsByLocation = nameToArray(options.roomsByLocation);
                dataList.forEach(function (city) {
                    if (city.location === options.roomsByLocation[0]) {
                        dataList = city.numbers;
                    }
                })
            } 

            if (collectionName === 'groups'){

                if (groupListParams.isMyGroups) {
                    dataList = dataList.findMyGroups(app.user.getShortName());
                }

                if (groupListParams.state) {
                    dataList = dataList.findGroupsByState(groupListParams.state);
                }

                if (dataList.length === 0) {

                     return dataList;
                }

                if (options.locations) {
                    dataList = dataList.findGroupsByLocations(options.locations);
                    dataList = dataList.findGroupsByState(groupListParams.state);
                }

                if (options.groupKey) {
                    dataList = dataList.findGroupByGroupKey(options);
                }

                if (options.groupsName) {
                    groupsKey = dataList.findGroupKeysByNames(options.groupsName);
                    dataList = dataList.findGroupsByGroupKey(groupsKey);
                }
                
                if (options.groupForKeyList) {
                    dataList = dataList.findGroupsKeyList(options.groupForKeyList);
                }

                if (dataList instanceof Backbone.Collection) {
                    dataList = splitToPages(dataList);
                }
            }

            if (collectionName === 'groupSchedule'){

                if (typeof(options.groupKey) === 'string'){
                    groupNameScheduleList = nameToArray(options.groupKey);
                } else if (!options.weekList) {
                    groupNameScheduleList = options.groupByKeySet;
                }

                if (groupListParams.isMyGroups && !options.weekList) {

                    myMainGroups = store.groups.findMyGroups(app.user.getShortName());
                    mainGroupsChecked = myMainGroups.findGroupsByGroupKey(groupNameScheduleList);

                    if (mainGroupsChecked[0]) {
                        myMainGroupsNames = store.groups.findGroupsKeyList(mainGroupsChecked);
                    } else {

                       return dataList = [undefined];
                    }
                }

                 if (groupListParams.state && !options.weekList) {

                    stateMainGroups = store.groups.findGroupsByState(groupListParams.state);
                    mainGroupsChecked = stateMainGroups.findGroupsByGroupKey(groupNameScheduleList);

                    if (mainGroupsChecked[0]) {
                        myMainGroupsNames = store.groups.findGroupsKeyList(mainGroupsChecked);
                    } else {

                       return dataList = [undefined];
                    }
                }

                if (dataList.length === 0) {

                     return dataList;
                }

                if (options.groupKey) {

                    if (myMainGroupsNames) {
                        dataList = dataList.findGroupsByGroupKey(myMainGroupsNames);
                    } else {
                        dataList = dataList.findGroupByGroupKey(options.groupKey);
                    }
                }

                if (options.groupsName) {

                    if (myMainGroupsNames) {
                        dataList = dataList.findGroupsByName(myMainGroupsNames);
                    } else {
                        dataList = dataList.findGroupsByName(options.groupsName);
                    }
                }
                                
                if (options.groupByKeySet) {

                    if (myMainGroupsNames) {
                        dataList = dataList.findGroupsByGroupKey(myMainGroupsNames);
                    } else {
                        dataList = dataList.findGroupsByGroupKey(options.groupByKeySet);
                    }
                } 
                
                if (options.weekList) {
                    var toArray = [];

                    if (options.weekList instanceof Backbone.Model) {
                        toArray.push(options.weekList);
                        options.weekList = toArray;
                    }

                    dataList = dataList.findWeeks(options.weekList);
                }

                if (options.groupForNameList) {
                    dataList = dataList.findGroupsNameList(options.groupForNameList);
                }
            }

            return dataList;
        };

        function nameToArray (name) {
            var nameList = [];

            if (typeof(name) === 'string') {
                nameList.push(name);
            }

            return nameList;
        }

        function splitToPages (collection) {
            var tmp = collection.slice(),
                pageElems = [],
                chunk;

            while (tmp.length > 0) {
                chunk = tmp.splice(0, groupListParams.pageSize);
                pageElems.push(chunk);
            }

            groupListParams.lastPage = pageElems.length;
            app.mediator.publish('GroupList paginator: pages defined', groupListParams);

            return pageElems[groupListParams.page];
        }

        return this;
    };

})(CS, app);
