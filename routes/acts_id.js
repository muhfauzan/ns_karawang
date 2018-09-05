var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
	const getId = req.params.id;
	connection.query('SELECT activity.id, activity.site_id, site.site_name, activity.category, activity.activity, activity.act_date FROM activity INNER JOIN site ON activity.site_id=site.site_id WHERE activity.site_id= ? ', getId, function (error, results, fields) {
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
