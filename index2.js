//require the just installed express app
var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');

const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'test'
});

db.connect((err) => {
	if(err) {
		throw err;
	}
	console.log('MySql Connected!');
});

//then we call express
var app = express();

app.get('/list', (req, res) => {
	let sql = 'SELECT * FROM to_do_list';
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Query Succesful');
	})
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

//the task array with initial placeholders for added task
var task = [];
//the completed task array with initial placeholders for removed task
var complete = [];

//post route for adding new task
app.post('/addtask', function (req, res) {
	var newActivity = req.body.newactivity;
	var siteId = req.body.siteid;
	//add the new task from the post route into the array
	if (newActivity != "") {
		task.push(newActivity);
		let post = {activity: newActivity, site_id: siteId};
		let sql = 'INSERT INTO to_do_list SET ?';
		let query = db.query(sql, post, (err, result) => {
		if (err) 
			throw err;
		//console.log(result);
		})
	}
	
	//after adding to the array go back to the root route
	res.redirect("/");
});

app.post("/removetask", function(req, res) {
     var completeTask = req.body.check;
	//check for the "typeof" the different completed task, then add into the complete task
	if (typeof completeTask === "string") {
	     complete.push(completeTask);
	//check if the completed task already exist in the task when checked, then remove using the array splice method
	task.splice(task.indexOf(completeTask), 1);
	} else if (typeof completeTask === "object") {
		for (var i = 0; i < completeTask.length; i++) {     
			complete.push(completeTask[i]);
	    	task.splice(task.indexOf(completeTask[i]), 1);
		}
	}
   	res.redirect("/");
});

//render the ejs and display added task, task(index.ejs) = task(array)
app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
    let sql = 'SELECT * FROM to_do_list';
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
			console.log(result);
	})
	
});

/*
exports.list = function(req, res){

  req.getConnection(function(err,connection){   
      var query = connection.query('SELECT * FROM to_do_list',function(err,rows){
        if(err)
          console.log("Error Selecting : %s ",err );

        res.render('index',{page_title:"Test Table",data:rows});
      });
  });
};
*/

//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('server is running on port 3000')
});

