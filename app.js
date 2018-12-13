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
var act = require('./routes/act');

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
app.use('/api/site', sites);
app.use('/api/battery', battery);
app.use('/api/rectifier', rectifier);
app.use('/api/eas', eas);
app.use('/api/genset', genset);
app.use('/api/transport', transport);
app.use('/api/act/', act);


//Site Service
app.post('/api/add_site', function (req, res) {
  var siteId = req.body.site_id
  var siteName = req.body.site_name;
  var rtp = req.body.rtp;
  var cluster = req.body.cluster;
  var kecamatan = req.body.kecamatan
  var kabupaten = req.body.kabupaten;
  var towerProv = req.body.tower_prov;
  var towerType = req.body.tower_type;
  var towerHigh = req.body.tower_high
  var siteType = req.body.site_type;
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, site_name: siteName, rtp: rtp, cluster: cluster, kecamatan: kecamatan, kabupaten: kabupaten, tower_prov: towerProv, tower_type: towerType, tower_high: towerHigh, site_type: siteType, longitude: longitude, latitude: latitude};
  let sql = 'INSERT INTO site SET ?';
  connection.query(sql, post, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });

  //res.redirect("/activity");
});

app.post('/api/modify_site', function (req, res) {
  var siteId = req.body.site_id
  var siteName = req.body.site_name;
  var rtp = req.body.rtp;
  var cluster = req.body.cluster;
  var kecamatan = req.body.kecamatan
  var kabupaten = req.body.kabupaten;
  var towerProv = req.body.tower_prov;
  var towerType = req.body.tower_type;
  var towerHigh = req.body.tower_high
  var siteType = req.body.site_type;
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, site_name: siteName, rtp: rtp, cluster: cluster, kecamatan: kecamatan, kabupaten: kabupaten, tower_prov: towerProv, tower_type: towerType, tower_high: towerHigh, site_type: siteType, longitude: longitude, latitude: latitude};
  let sql = 'UPDATE site SET ? WHERE site_id = ?';
  connection.query(sql, [post, siteId], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.delete('/api/delete_site', function (req, res) {
  var siteId = req.body.site_id;
  console.log(JSON.stringify(req.body));
  
  let sql = 'DELETE FROM site WHERE site_id = ?';
  connection.query(sql, siteId, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


//Battery Service
app.post('/api/add_battery', function (req, res) {
  var siteId = req.body.site_id
  var brand = req.body.brand;
  var bank = req.body.bank;
  var installDate = req.body.install_date;
  var protection = req.body.protection
  var backupTime = req.body.backup_time;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, brand: brand, bank:bank, install_date:installDate, protection: protection, backup_time:backupTime };
  let sql = 'INSERT INTO battery SET ?';
  connection.query(sql, post, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post('/api/modify_battery', function (req, res) {
  var siteId = req.body.site_id
  var brand = req.body.brand;
  var bank = req.body.bank;
  var installDate = req.body.install_date;
  var protection = req.body.protection
  var backupTime = req.body.backup_time;


  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, brand: brand, bank:bank, install_date:installDate, protection: protection, backup_time:backupTime };
  let sql = 'UPDATE battery SET ? WHERE site_id = ?';
  connection.query(sql, [post, siteId], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.delete('/api/delete_battery', function (req, res) {
  var siteId = req.body.site_id;
  console.log(JSON.stringify(req.body));
  
  let sql = 'DELETE FROM battery WHERE site_id = ?';
  connection.query(sql, siteId, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//Rectifier Service
app.post('/api/add_rectifier', function (req, res) {
  var siteId = req.body.site_id
  var brand = req.body.brand;
  var entity = req.body.entity;
  var capacity = req.body.capacity;
  var currentLoad = req.body.current_load

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, brand: brand, entity:entity, capacity:capacity, current_load: currentLoad};
  let sql = 'INSERT INTO rectifier SET ?';
  connection.query(sql, post, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post('/api/modify_rectifier', function (req, res) {
  var siteId = req.body.site_id
  var brand = req.body.brand;
  var entity = req.body.entity;
  var capacity = req.body.capacity;
  var currentLoad = req.body.current_load;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, brand: brand, entity:entity, capacity:capacity, current_load: currentLoad};
  let sql = 'UPDATE rectifier SET ? WHERE site_id = ?';
  connection.query(sql, [post, siteId], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.delete('/api/delete_rectifier', function (req, res) {
  var siteId = req.body.site_id;
  console.log(JSON.stringify(req.body));
  
  let sql = 'DELETE FROM rectifier WHERE site_id = ?';
  connection.query(sql, siteId, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//EAS Service
app.post('/api/add_eas', function (req, res) {
  var siteId = req.body.site_id
  var mainsFail = req.body.mains_fail;
  var moduleRectiFail = req.body.modulerecti_fail;
  var batteryStolen = req.body.battery_stolen;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, mains_fail: mainsFail, modulerecti_fail:moduleRectiFail, battery_stolen:batteryStolen};
  let sql = 'INSERT INTO eas SET ?';
  connection.query(sql, post, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post('/api/modify_eas', function (req, res) {
  var siteId = req.body.site_id
  var mainsFail = req.body.mains_fail;
  var moduleRectiFail = req.body.modulerecti_fail;
  var batteryStolen = req.body.battery_stolen;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, mains_fail: mainsFail, modulerecti_fail:moduleRectiFail, battery_stolen:batteryStolen};
  let sql = 'UPDATE eas SET ? WHERE site_id = ?';
  connection.query(sql, [post, siteId], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.delete('/api/delete_eas', function (req, res) {
  var siteId = req.body.site_id;
  console.log(JSON.stringify(req.body));
  
  let sql = 'DELETE FROM eas WHERE site_id = ?';
  connection.query(sql, siteId, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//Transport Service
app.post('/api/add_transport', function (req, res) {
  var siteId = req.body.site_id
  var macAdd = req.body.mac_add;
  var transportType = req.body.transport_type;
  var farEnd = req.body.far_end;
  var metro = req.body.metro;
  var portMetro = req.body.port_metro;
  var service = req.body.service;
  var clock = req.body.clock;
  var oam = req.body.oam;
  var gsm = req.body.gsm;
  var cplane = req.body.cplane;
  var uplane = req.body.uplane;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, mac_add: macAdd, transport_type: transportType, far_end: farEnd, metro: metro, port_metro:portMetro, service: service, clock: clock, oam: oam, gsm:gsm, cplane: cplane, uplane: uplane};
  let sql = 'INSERT INTO transport SET ?';
  connection.query(sql, post, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post('/api/modify_transport', function (req, res) {
  var siteId = req.body.site_id
  var macAdd = req.body.mac_add;
  var transportType = req.body.transport_type;
  var farEnd = req.body.far_end;
  var metro = req.body.metro;
  var portMetro = req.body.port_metro;
  var service = req.body.service;
  var clock = req.body.clock;
  var oam = req.body.oam;
  var gsm = req.body.gsm;
  var cplane = req.body.cplane;
  var uplane = req.body.uplane;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, mac_add: macAdd, transport_type: transportType, far_end: farEnd, metro: metro, port_metro:portMetro, service: service, clock: clock, oam: oam, gsm:gsm, cplane: cplane, uplane: uplane};
  let sql = 'UPDATE transport SET ? WHERE site_id = ?';
  connection.query(sql, [post, siteId], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.delete('/api/delete_transport', function (req, res) {
  var siteId = req.body.site_id;
  console.log(JSON.stringify(req.body));
  
  let sql = 'DELETE FROM transport WHERE site_id = ?';
  connection.query(sql, siteId, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//Genset Service
app.post('/api/add_genset', function (req, res) {
  var siteId = req.body.site_id
  var brand = req.body.brand;
  var powerCapacity = req.body.power_capacity;
  var fuelCapacity = req.body.fuel_capacity;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, brand: brand, power_capacity: powerCapacity, fuel_capacity: fuelCapacity};
  let sql = 'INSERT INTO genset SET ?';
  connection.query(sql, post, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post('/api/modify_genset', function (req, res) {
  var siteId = req.body.site_id
  var brand = req.body.brand;
  var powerCapacity = req.body.power_capacity;
  var fuelCapacity = req.body.fuel_capacity;

  console.log(JSON.stringify(req.body));
  
  let post = {site_id: siteId, brand: brand, power_capacity: powerCapacity, fuel_capacity: fuelCapacity};
  let sql = 'UPDATE genset SET ? WHERE site_id = ?';
  connection.query(sql, [post, siteId], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.delete('/api/delete_genset', function (req, res) {
  var siteId = req.body.site_id;
  console.log(JSON.stringify(req.body));
  
  let sql = 'DELETE FROM genset WHERE site_id = ?';
  connection.query(sql, siteId, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//Activity Service
app.post('/api/add_activity', function (req, res) {
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

app.post('/api/modify_activity', function (req, res) {
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

app.delete('/api/delete_activity', function (req, res) {
  var id = req.body.id;
  console.log(JSON.stringify(req.body));
  
  //let post = {id: id};
  let sql = 'DELETE FROM activity WHERE id = '+req.body.id+'';
  connection.query(sql, function (error, results, fields) {
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