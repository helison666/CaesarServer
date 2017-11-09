(function (This, app) {

	This.Controller = function Controller () {

		app.mediator.subscribe('Users: loaded', makeTeachers, {}, this);

		this.load = function Constructor () {
			app.infoblock.users = new This.Users();

			app.infoblock.users.teachers = new This.Teachers();

			return this;
		};

		function makeTeachers (collection) {
			collection.each(function (user) {
				if (app.user.get('role') === 'Administrator') {
					app.infoblock.users.teachers.add(user);
				} else if (user.get('location') === app.user.get('location')) {
					app.infoblock.users.teachers.add(user);
				}
			});
		}

		return this;
	};

})(CS.Storage, app);