var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var bodyParser = require('body-parser');
var http = require('http');

var index = require('./routes/index');
var acts = require('./routes/acts');

var app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
	  	host     : 'localhost',
	  	user     : 'root',
	  	password : '',
  		database : 'test'
	});
	connection.connect();
	next();
});


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.use('/', index);
app.use('/api/act', acts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;
var server = http.createServer(app);

app.listen(port, () => console.log(`Listening on port ${port}`));