var express = require('express');
var path = require('path');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var index = require('./routes/index');
var sites = require('./routes/sites');
var battery = require('./routes/battery');
var rectifier = require('./routes/rectifier');
var eas = require('./routes/eas');
var transport = require('./routes/transport');
var genset = require('./routes/genset');
var acts = require('./routes/acts');
var acts_id = require('./routes/acts_id');

var app = express();

const port = process.env.PORT || 5000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes'));


//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
	  	host     : 'localhost',
	  	user     : 'root',
	  	password : '',
  		database : 'nsk'
	});
	connection.connect();
	next();
});

app.use('/', index);
app.use('/api/acts', acts);
app.use('/api/act/', acts_id);
app.use('/api/sites', sites);
app.use('/api/battery', battery);
app.use('/api/rectifier', rectifier);
app.use('/api/eas', eas);
app.use('/api/genset', genset);
app.use('/api/transport', transport);

//rest api to create a new record into mysql database
app.post('/api/addact', function (req, res) {
  var siteId = req.body.siteid;
  var category = req.body.category;

  var activity = req.body.activity;
  var actDate = req.body.actdate;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, category:category, activity: activity, act_date:actDate};
  let sql = 'INSERT INTO activity SET ?';
  connection.query(sql, post, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });

  //res.redirect("/activity");
});

app.delete('/api/delact', function (req, res) {
  var id = req.body.id;
  console.log(JSON.stringify(req.body));
  
  //let post = {id: id};
  let sql = 'DELETE FROM activity WHERE id = '+req.body.id+'';
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post('/api/modact', function (req, res) {
  var siteId = req.body.siteid;
  var category = req.body.category;
  var activity = req.body.activity;
  var actDate = req.body.actdate;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, category:category, activity: activity, act_date:actDate};
  let sql = 'UPDATE activity SET ? WHERE id = '+req.body.id+'';
  connection.query(sql, post, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

app.listen(port, () => console.log(`Listening on port ${port}`));