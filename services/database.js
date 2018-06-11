var mysql = require('mysql');

//var DB = process.env.DB_NAME;

var state = {
	pool : null
};

exports.connect = function(done) {
	state.pool = mysql.createPool({
	  	host     : 'localhost',
	  	user     : 'root',
	  	password : '',
  		database : 'test'
	});
	done();
}

exports.get = function() {
	return state.pool
}