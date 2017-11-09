'use strict';

(function (This, app) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'GroupList paginator: page-selected': 'groupsRender',
            'Students: score-request': 'showScoreStudentList',
            'Students: groups selected': 'showSelectedGroup',
            'Students: editStudent request': 'editStudent',
            'Students: create-request': 'createStudent',
            'Students: download-request': 'downloadAttachments',
            //'Students: errorFormat request': 'errorFormat',
            'Students: crud-request': 'manageStudents',
            'Students: edit-request': 'showForm',
            'Students: delete-request': 'delete',
            'Students: csv-request': 'confirmCSV',
            'Menu: changed-page': 'deleteView',
            'Locations: selected': 'show'
        },

        initialize: function () {
            ActivePage.setDescription('Students');

            this.mediator = app.mediator;

            this.$content = app.domProvider.contentSection;  
            this.$sidebar = app.domProvider.leftSideBar;
            
            this.store = {
                selectedGroups: [],
                manageGroup: {}
            };
        },
        
        show: function (locations) {
            var description = ActivePage.getDescription();

            if (description === 'Students'){
                if (this.groupListView) {
                    this.deleteView();    
                }

                this.contentView = new This.ContentView();
                this.$content.html(this.contentView.render().el);
                
                this.groupListView = new CS.GroupList.GroupListView();
                this.$sidebar.html(this.groupListView.render(locations).el);
                
                this.isOpen = true;
                this.locations = locations;

                this.$main = $('.main-section');
            }
        },

        showSelectedGroup: function (groups, action) {
            var _hideEdit = (groups.length === 0) ? false : true,
                groupView, students;

            this.store.selectedGroups = groups;

            students = app.filter.split('students', groups),
            groupView = new This.StudentsView({
                groups: groups,
                collection: students,
                hideEdit: _hideEdit
            });

            this.$main.html(groupView.render().el);
            groupView.showStubView(action);
        },

        groupsRender: function () {
            if (this.isOpen) {
                this.groupListView.renderGroups(this.locations);
            }
        },

        showForm: function () {
            var groups = this.store.selectedGroups,
                editListChoiceView;

            if (groups.length > 1) {
                editListChoiceView = new This.EditStudentListChoiceView({
                    collection: groups,
                });

                this.modal(editListChoiceView);
            } else {
                app.mediator.publish('Students: crud-request', groups[0]);
            }
        },

        manageStudents: function (group) {
            if (!group.namespace) {
                this.store.manageGroup = group;
            }

            var students = app.filter.split('students', this.store.manageGroup),
                editStudentListView = new This.EditStudentListView({
                    model: this.store.manageGroup,
                    collection: students
            });

            this.modal(editStudentListView);
        },

        showScoreStudentList: function () {
            var students = app.filter.split('students', this.store.manageGroup),
                scoreModalStudentListView = new This.ScoreModalStudentListView({
                    model: this.store.manageGroup,
                    collection: students
            });

            this.modal(scoreModalStudentListView);
        },

        createStudent: function () {
            var createStudent = new This.CreateStudentView({
                model: this.store.manageGroup
            });

            this.modal(createStudent);
        },

        editStudent: function (student) {
            var attachment = app.filter.split('attachments', student),
                editStudent = new This.EditStudentView({
                    model: student,
                    group: this.store.manageGroup,
                    attachment: attachment
            });

            this.modal(editStudent);
        },

        showGroupViewByRoute: function (locations, groupNames, action) {
            var selectedGroups;

            if (this.showLocationByRoute(locations)) {
                if (store.groups.checkGroupsByName(groupNames)) {
                    selectedGroups = app.filter.split('groups', {groupsName: groupNames});
                    this.showSelectedGroup(selectedGroups, action);

                    app.mediator.publish('GroupList: activate groups', selectedGroups);
                } else {
                    app.mediator.publish('Error: show-error-page', {
                        elem: this.$main,
                        message: 'such a group is not found'
                    });
                }
            }

            return store.groups.checkGroupsByName(groupNames);
        },

        showLocationByRoute: function (arrLocations) {
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
                var arr = [];

                locations.forEach(function (location) {
                    if (store.locations.getNames().indexOf(location) < 0) {
                        arr.push(location);
                    }
                });

                return arr.length;
            }
        },

        deleteView: function () {
            if (this.isOpen) {
                this.isOpen = false;
                this.contentView.remove();
                this.groupListView.remove();
                this.groupListView.paginatorView.remove();
            }
        },

        delete: function (student) {
            var studentDeleteView = new This.StudentDeleteView({
                model: student
            });
            
            this.modal(studentDeleteView);
        },

        downloadAttachments: function (student) {
            var attachments = store.attachments.findAttachmentsByStudent(student),
                studentAttachmentView = new This.AttachmentsListView({
                model: student,
                collection: attachments
            });

            this.modal(studentAttachmentView);
        },

        confirmCSV: function (students) {
            var editStudentListView = new This.EditStudentListView({
                model: this.store.manageGroup,
                csv: {showConfirm: true},
                collection: students
            });

            this.modal(editStudentListView);
        },

        /*errorFormat: function () {
            var errorFormat = new This.ErrorFormatPageView({});

            this.modal(errorFormat);
        },*/

        modal: function (view) {
            app.domProvider.modalWindow.html(view.render().el);
        }
    })
})(CS.Students, app);