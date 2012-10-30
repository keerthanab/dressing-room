


      

fbConnect= function(){
		
		FB.init({
			appId : '426938124022578',
			channelUrl : '//localhost:3000/channel.html',
			status : true,
			cookie : true,
			xfbml : true
		}, true);
		
		FB.getLoginStatus(function(response) {
			console.log('Logginggggg');
			if (response.status === 'connected') {
					// connected
					//alert('Connected');
						testAPI(function(model){
						console.log(model);
					
			
					
						var myForm = document.createElement("form");
  					myForm.method="get" ;
  					myForm.action = "/index";
 						var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            
            hiddenField.setAttribute("name", "userId");
            hiddenField.setAttribute("value", model.name);
            
            //hiddenField.setAttribute("name", "userDet");
            //hiddenField.setAttribute("value", model);

            myForm.appendChild(hiddenField);

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
	
