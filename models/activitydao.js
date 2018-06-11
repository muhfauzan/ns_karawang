"use strict"

class ActivityDAO {

	constructor(db) {
		this.db = db;
	}

	getAll() {
		var query = 'SELECT * from to_do_list';
		console.log();
		var that = this;
		return new Promise(function(resolve, reject) {
			that.db.get().query(query, function(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
}

module.exports = ActivityDAO;