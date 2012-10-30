
/*
 * GET home page.
 */

exports.home = function(req, res){
  res.render('home', { title: 'Express', userName: req.session.userName });
};

exports.index = function(req, res){
	console.log(req.param('userId'));
	//var model = req.param('userDet');
		//for (var key in model) {
			//			console.log(key+'  '+model[key]);
				//		}
	req.session.userName = req.param('userId');
  res.render('index', { title: 'Express', userName: req.session.userName });
};


exports.signout = function(req, res){
  req.session.userName = null;
    // redirect the user to homepage
    res.redirect('/');
};
