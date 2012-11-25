
var dbFunctions = require('../modules/dbFunctions');

var Imager = require('imager')
  , imagerConfig = require('../config/example-config')
  , imager = new Imager(imagerConfig, 'S3'); // or 'S3' for amazon

/*
 * GET home page.
 */

// To Home Page
exports.home = function(req, res){  
  console.log(""+req.session.userName);

  if(req.session.userName == null){
  	res.render('home', { title: 'Envwe', userName: req.session.userName });
  } else{
  		res.render('index', { title: 'Envwe', userName: req.session.userName });
  	}
  
};


// to index page
exports.index = function(req, res){
	var userDet=JSON.parse(req.param('userDet'));
	dbFunctions.update(userDet, function(){ // note: callback example
		console.log("I have returned to index.js ");	
	});
	var employer=JSON.parse(req.param('userDet'));
	req.session.userName = req.param('userId');
  	res.render('index', { title: 'Express', userName: req.session.userName });
};


exports.signout = function(req, res){
  req.session.userName = null;
    // redirect the user to homepage
    res.redirect('/');
};


// TO handle uploaded file
exports.fileUpload = function(req, res) {
    //console.log(req.body);
    console.log("file-size:"+req.files.firstUpload.size);
    console.log("file-name:"+req.files.firstUpload.name);
 	console.log("file-path:"+req.files.firstUpload.path);
   
/*	imager.upload(req.files.firstUpload, 
		function(err, cdnUri, files) {
			console.log("WOW -- I have almost uploaded the image");
			
		}, 'projects'); */
	imager.upload([req.files.firstUpload.path], function (err, cdnUri, files) {
		// do your stuff
		console.log("I am in callback of upload fucntion ");
		console.log("error object in callback: -- "+err);
		console.log("Okay so whats's the access URI now?" +cdnUri+'/'+'thumb'+files[0]);
		}, 'projects');
	
	console.log("I am actually outside callback of upload --- what's happening now?");
    //dbFunctions.uploadImage(req.files.firstUpload); // TODO: give a callback function and check the flow if it returned back to index.js from dbFunctions!
    

    res.render('index', { title: 'Express', userName: req.session.userName });
};

exports.getImage = function(req, res){
console.log(req.params.id);
dbFunctions.getImage(req.params.id);
};
