'use strict';

(function (This) {
	This.Student = Backbone.Model.extend({
        urlRoot: '/students',
		defaults: {
			groupId: '',
			name: '',
			lastName: '',
			englishLevel: '',
			CvUrl: '',
			avatar: '',
            incomingScore: '',
            entryScore: '',
			approvedBy: ''
		}
	});
})(CS.Students);