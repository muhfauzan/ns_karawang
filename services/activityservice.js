"use strict";

class ActivityService {
	constructor(activityDAO) {
		this.activityDAO = activityDAO;
	}

	getAllActivity() {
		return this.activityDAO.getAll();
	}
}

module.exports = ActivityService;