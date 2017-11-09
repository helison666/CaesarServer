'use strict';

(function (This) {
	This.StudentsList = Backbone.Collection.extend({
        model: This.Student,
		url: '/students',

        findStudentsByGroups: function (groups) {
            var students = [];

            groups.forEach(function (group) {
                students = students.concat(this.where({'groupId': group.get('groupKey')}));
            }, this);

            return students;
        },

        findStudentsByGroupKey: function (groupKey) {
            return this.where({'groupId': groupKey});
        }
	});
})(CS.Students);