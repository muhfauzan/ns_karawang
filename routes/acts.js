var express = require('express');
var router = express.Router();
var activityController = require('../controllers/activitycontroller');

/* GET activities listing. */
/*
router.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  next();
})

router.get('/', activityController.getActivities);
*/

router.get('/', function(req, res, next) {
	connection.query('SELECT * from activity', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* Dummy activities listing. */

/*
router.get('/', function(req, res, next) {
 // res.send('respond with a resource');
  res.json([{
    id: 1,
    site_id: "BKS123",
    category: "Power",
    activity: "Upgrade rectifier",
    date: "2018-01-01"
  }, {
    id: 2,
    site_id: "BKS456",
    category: "Power",
    activity: "Swap module",
    date: "2018-01-02"
  }]);
});
*/

module.exports = router;
