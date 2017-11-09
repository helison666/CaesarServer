(function (This) {
    This.TeacherView = Backbone.View.extend({
        template: templates.groupTeachersTpl,

        events: {
            'click .add-teacher-btn': 'renderTeacherSelect',
            'click #cancelSelect': 'renderAddBtn',
            'click #acceptSelect': 'addTeacher',
            'click .remove-teacher': 'removeTeacher'
        },

        initialize: function (teachers) {
            this.teachers = teachers;
            this.allTeachers = this.getShortNames(i.teachers);
            this.defaultTeacher = app.user.getShortName();
        },

        render: function () {
            this.$el.html(this.template());
            this.renderList();
            this.renderAddBtn();
            return this;
        },

        renderList: function () {
            this.$el.find('.list').html(templates.groupTeacherTpl({teachers: this.teachers}))
        },

        renderAddBtn: function () {
            this.$el.find('.add-teacher').html(templates.groupMoreTeacherTpl())
        },

        renderTeacherSelect: function () {
            this.$el.find('.add-teacher').html(templates.groupSelectTeacherTpl({
                allTeachers: _.difference(this.allTeachers, this.teachers),
                defaultTeacher: this.defaultTeacher}))
        },

        addTeacher: function () {
            var newTeacher = this.$el.find('#teachers option:selected').text();
            this.teachers.push(newTeacher);
            this.renderList();
            this.renderAddBtn();
        },

        removeTeacher: function (event) {
            var teacherIndex = this.teachers.indexOf($(event.target).data('teacher'));
            this.teachers.splice(teacherIndex,1);
            this.renderList()
        },

        getShortNames: function (fullNames) {
            var elements = [],
                firstName = '',
                lastName = '',
                teachers = [];

            fullNames.forEach(function(fullName) {
                elements = fullName.split(' ');
                firstName = elements[0];
                lastName = elements[1];
                teachers.push(firstName.charAt(0) + '. ' + lastName);
            }); 

            return teachers;
        },
    });
})(CS.Groups);