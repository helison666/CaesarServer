'use strict';
function ActivityModel (_activity) {
	var activity = {};

	this.setActivity = function (_activity) {
		activity = _activity;
	};

	this.getActivity = function () {
		return activity;
	};
}
