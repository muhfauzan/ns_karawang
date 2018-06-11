var ActivityService = require('../services/activityservice');
var ActivityDAO = require('../models/activitydao');
var database = require('../services/database');

var activityDAO = new ActivityDAO(database);
var activityService = new ActivityService(activityDAO);

exports.getActivities = function(req, res, next) {
	activityService.getAllActivity().then(function(data) {
		res.send({acts: data});
	}).catch(function(err) {
		next(err);
	})
}