var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	connection.query('SELECT transport.site_id, site.site_name, transport.mac_add, transport.transport_type, transport.far_end, transport.metro, transport.port_metro, transport.service, transport.clock, transport.oam, transport.2g, transport.cplane, transport.uplane FROM transport INNER JOIN site ON transport.site_id=site.site_id', function (error, results, fields) {
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
