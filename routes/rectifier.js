var express = require('express');
var router = express.Router();
var activityController = require('../controllers/activitycontroller');

router.get('/', function(req, res, next) {
	connection.query('SELECT rectifier.site_id, site.site_name, rectifier.brand, rectifier.entity, rectifier.capacity, rectifier.current_load FROM rectifier INNER JOIN site ON rectifier.site_id=site.site_id', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

module.exports = router;
