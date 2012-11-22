
fbConnect = function(){
	
	FB.init({
		appId : '426938124022578',
		channelUrl : '//localhost:3000/channel.html',
		status : true,
		cookie : true,
		xfbml : true
	}, true);
		
	FB.getLoginStatus(function(response) {
		console.log('Logging in');
		if (response.status === 'connected') {
				// connected
				//alert('Connected');
				testAPI(function(model){
					console.log(model);
					var myForm = document.createElement("form");
 						myForm.method="post" ;
 						myForm.action = "/index";	
					var formField1 = document.createElement("input");
           				formField1.setAttribute("type", "hidden");
           				formField1.setAttribute("name", "userId");
           				formField1.setAttribute("value", model.name);

           			myForm.appendChild(formField1);
           			//alert(JSON.stringify(userDetails));
           			var formField2 = document.createElement("input");
           				formField2.setAttribute("type", "hidden");            
           				formField2.setAttribute("name", "userDet");
           				formField2.setAttribute("value", JSON.stringify(model));

           			myForm.appendChild(formField2);
 					document.body.appendChild(myForm);
				  	myForm.submit();
				});	
		} else if (response.status === 'not_authorized') {
				// not_authorized
				login();
				
		} else {
				// not_logged_in
				login();
		}
		
	}, true);
	
};
	
	
function login() {		
	FB.login(function(response) {
		if (response.authResponse) {
			testAPI(function(model){
				console.log(model);
				var myForm = document.createElement("form");
 					myForm.method="get" ;
 					myForm.action = "/index";
				var hiddenField = document.createElement("input");
           			hiddenField.setAttribute("type", "hidden");
           			hiddenField.setAttribute("name", "userId");
           			hiddenField.setAttribute("value", model.name);
           		myForm.appendChild(hiddenField);
 				document.body.appendChild(myForm);
				myForm.submit();
			});
		} else {
			// not_logged_in
		}
	}, {scope: 'email,user_likes'});
}
		
		
function testAPI(callback) {
	FB.api('/me', function(response) {
		//alert('Good to see you, ' + response.name + '.');
		callback(response);
		//alert(response.name);		
	}, true);
}

		
//To load FB js SDK	 - include this method	
(function(d){
	
	console.log('In normal func');
	var js,id='facebook-jssdk', ref=d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {	return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
	
}(document));
	
FB.Event.subscribe('auth.login', function(response) {
 	// do something with response
 	alert('in login');
});
	
