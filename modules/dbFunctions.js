
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var GridStore = require('mongodb').GridStore;
var ObjectID = require('mongodb').ObjectID;
var dbPort = 27017;
var dbHost = "127.0.0.1";
var dbName = 'envwe';

var AM = {}; 
	AM.db = new Db(dbName, new Server(dbHost, dbPort, {}), {safe: false}, {strict: false});
	AM.db.open(function(e, d){
		if (e) {
			console.log(e + 'error while connecting to db');
		}	else{
			console.log('connected to database :: ' + dbName);
		}
	});	
AM.users=AM.db.collection("users");
module.exports = AM;

AM.update=function (user, callBack){
	console.log("I am in nodejs File "+ user.name);
	AM.users.find({"id": ""+user.id+""}).count(function(error, result){
		console.log(result);
 		if(result===0){
			AM.users.insert(user);
			console.log("data inserted. Welcome new user");
		}else{
			console.log("Old user");
		}
	})
	
	callBack(null);

};

AM.upoadImage = function(image, callBack){	
	console.log("in DBFunc "+image.name);
	var gridStoreWrite = new GridStore(AM.db, new ObjectID(),image.name,"w",{metadata: {"userID":12345}}); 
	gridStoreWrite.writeFile(image.path, function(err, result){
		if(err){
			console.log("Error while writing in DB "+err);
		}else{
			console.log("Written Success in DB "+result._id+result.filename);
		}
	});
};

AM.getImage = function(imgId){
	
	console.log(imgId);
	var gridStore = new GridStore(AM.db, imgId, "r");
	gridStore.open(function(err, gridStore) {
		var stream = gridStore.stream();
	  	stream.on("data", function(chunk) {
	    	console.log("Chunk of file data");
	  	});
	  	stream.on("end", function() {
	    	console.log("EOF of file");
	  	});
	  	stream.on("close", function() {
	    	console.log("Finished reading the file");
	  	});
	});

};

