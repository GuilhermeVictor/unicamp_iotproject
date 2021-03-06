// app/routes.js

var fb_api = require('./config/facebook');

module.exports = function(config, app, passport, render, arduinoserialport, taskScheduler) {
	var sidenavprovider = require('./utility/sidenavprovider')(passport);		
	
	//index
	app.get('/', isLoggedIn, function (req, res) {		
		sidenavprovider.getBasePageModel(req, 'home', function (model) {
			var html = render.view(config.appPath + '/views/index.mustache', model);
			res.send(html);		
		});
	});

	//turn on/off the court lights
	app.post('/courtlight', isLoggedIn, function (req, res) {
		var result = {};
		
		if (req.body.courtStatus == config.sports.off) {
			arduinoserialport.setCourtLight(config.sports.on, function () {
				result.courtStatus = config.sports.on;
				postResult(res, 200, result);
			});					
			
		} else {
			arduinoserialport.setCourtLight(config.sports.off, function () {			
				result.courtStatus = config.sports.off;
				postResult(res, 200, result);
			});			
		}
	});

	app.post('/post', function(req, res) {
		passport.deserializeUser(req.session.passport.user, function (err, user) {
			var model = {};
			
			model.token = user.getToken();
			
			if (model.token) {

				// Call function that contains API call to post on Facebook (see facebook.js)
	   		 	fb_api.postMessage(model.token, req.body.message, function (err) {
					
					//console.log(err);
					
					if (err) {
						
						if (err.code == 200) 
							postResult(res, 400, { message: "Você não deu permissão para escrever na sua linha do tempo." });
						
						else
							postResult(res, 400, err);
					}
					else
						postResult(res, 200);					
				});
	   		 	
	    
	  		} else {
				
				postResult(res, 400, { message: "Você não está logado no facebook." });
			}					
		});		

	  // Check to ensure user has a valid access_token
	  
	});

	//change sport call
	app.post('/changesport', isLoggedIn, function (req, res) {	
		var result = {};
		
		arduinoserialport.setCourtSport(req.body.sport, function () {
			
			result.sport = req.body.sport;
			postResult(res, 200, result);
		});		
	});

	app.post('/roomlight', isLoggedIn, function (req, res) {	
		var result = {};
		
		var lightStatus = req.body.lightStatus;
		var room = req.body.room;
		
		arduinoserialport.setLightStatus(room, lightStatus, function () {
			
			result.lightStatus = lightStatus;
			postResult(res, 200, result);
		});			
	});
	
	app.post('/docommand', isLoggedIn, function (req, res) {	
		var result = {};
		
		arduinoserialport.setCurtainStatus(req.body.command, function () {
							
			postResult(res, 200, null);
		});			
	});

	app.post('/docoffe', isLoggedIn, function (req, res) {	
		var result = {};
		
		arduinoserialport.coffe(function () {
							
			postResult(res, 200, null);
		});			
	});
	
	app.post('/schedulecommand', isLoggedIn, function (req, res) {	
				
		taskScheduler.addTask(req.body, function (err, task) {			
			if (err)
				throw err;
			
			postResult(res, 200, task);			
		});			
		
	});
	
	app.post('/deleteTask', isLoggedIn, function (req, res) {	
				
		taskScheduler.deleteTask(req.body._id, function (err) {
			if (err)
				throw err;
			
			postResult(res, 200, null);			
		});			
		
	});
	
	//calendar
	app.get('/calendar', isLoggedIn, function (req, res) {
		sidenavprovider.getBasePageModel(req, 'calendar', function (model) {
			var html = render.view(config.appPath + '/views/calendar.mustache', model);
			res.send(html);		
		});
	});	
	
	//schedulers
	app.get('/scheduler', isLoggedIn, function (req, res) {
		sidenavprovider.getBasePageModel(req, 'time', function (model) {
			
			taskScheduler.getAllFutureTasks(model, function (err, model) {
				
				if(err)
					throw err;
				
				var html = render.view(config.appPath + '/views/schedule.mustache', model);
				res.send(html);		
			});									
		});
	});	
	
    // route for the login form
    app.get('/login', function(req, res) {	
        // render the page and pass in any flash data if it exists
		var message = req.flash('loginMessage') + '';		
		var hasMessage = (message != '');		
        
		var html = render.view_main(config.appPath + '/views/login.mustache', { hasMessage: hasMessage, message: message});
		res.send(html);
    });
	
	// route for processing the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	       
	// route for the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
	
    // route for processing the signup form
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	
    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'publish_actions' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));

    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/google/oauth2/callback', 
		passport.authenticate('google', { successRedirect : '/', failureRedirect : '/login' })
	);

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the login page
    res.redirect('/login');
}

function postResult(res, code, data) {
	res.status(code).send(JSON.stringify(JSON.stringify(data)));
	res.end();
}


