var express = require('express');
var router = express.Router();


router.get('/api/delact', function(req, res, next) {
    res.locals.connection.query('DELETE from activity where id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

module.exports = router;
