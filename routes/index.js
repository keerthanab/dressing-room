
var dbFunctions = require('../modules/dbFunctions');



var knox = require('knox');
var s3Config = require('../config/example-config');

/*
 * GET home page.
 */

// To Home Page
exports.home = function(req, res){  
  console.log(""+req.session.userName);

  if(req.session.userName == null){
  	res.render('home', { title: 'Envwe', userName: req.session.userName });
  } else{
  		res.render('index', { title: 'Envwe', userName: req.session.userName, filePath: null });
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
  	res.render('index', { title: 'Express', userName: req.session.userName, filePath: null });
};


exports.signout = function(req, res){
  req.session.userName = null;
    // redirect the user to homepage
    res.redirect('/');
};

var fs = require('fs');


// TO handle uploaded file
exports.fileUpload = function(req, res) {
    //console.log(req.body);
    console.log("file-size:"+req.files.firstUpload.size);
    console.log("file-name:"+req.files.firstUpload.name);
 	console.log("file-path:"+ "../"+req.files.firstUpload.path);
		
	var client = knox.createClient({
    	key: s3Config.key
  		,secret: s3Config.secret
  		,bucket: s3Config.bucket
	});
	
	dbFunctions.createPhotoDoc(req.session.userName, function(photoFileName){
		client.putFile(req.files.firstUpload.path, photoFileName, {'Content-Type': 'image/jpeg'}, function(err, result) {
	    	if (err) { 
				console.log('Operation Failed'+ err); 
			} else { 
				console.log('Uploaded successfuly'); 
			}
		});
		
		// GET the file from amazon
		// We need the fs module so that we can write the stream to a file
		// Set the file name for WriteStream
		var file = fs.createWriteStream('public/downloads/'+photoFileName);
		client.getFile('sample.jpg', function(err, res) {
		   res.on('data', function(data) { file.write(data); });
		   res.on('end', function(chunk) { file.end(); });
		   console.log("File downloaded");
		   res.render('index', { title: 'Express', userName: req.session.userName, filePath: 'http://localhost:3000/downloads/'+photoFileName });
		});
			
	});
	
	console.log("I am actually outside callback of upload --- what's happening now?");
    //dbFunctions.uploadImage(req.files.firstUpload); // TODO: give a callback function and check the flow if it returned back to index.js from dbFunctions!
	};

exports.getImage = function(req, res){
console.log(req.params.id);
dbFunctions.getImage(req.params.id);
};
