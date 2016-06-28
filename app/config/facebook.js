var request = require('request');

function postMessage(access_token, message, done) {
    // Specify the URL and query string parameters needed for the request
    var url = 'https://graph.facebook.com/me/feed';
    var params = {
        access_token: access_token,
        message: message
    };

	// Send the request
    request.post({url: url, qs: params}, function(err, resp, body) {
      
		if (err) {
			// Handle any errors that occur
			console.error("Error occured: ", err);
			done(err);
		}		  
		  
		body = JSON.parse(body);		
		
		if (body.error) 
			done(body.error);
		else
			done(null);
    });

}

exports.postMessage = postMessage;