// app/routes.js

module.exports = function(config, app, passport, render) {
	var sidenavprovider = require('./utility/sidenavprovider')(passport);	
	var arduinoserialport = require('./controllers/arduinoserialport')(config);
	
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
	
	//change sport call
	app.post('/changesport', isLoggedIn, function (req, res) {	
		var result = {};
		
		if (req.body.sport == config.sports.tennis) {
			arduinoserialport.setCourtLight(config.sports.tennis, function () {
			
				result.sport = config.sports.tennis;
				postResult(res, 200, result);
			});
			
		} else if (req.body.sport == config.sports.bascketball) {
			arduinoserialport.setCourtLight(config.sports.bascketball, function () {
			
				result.sport = config.sports.bascketball;
				postResult(res, 200, result);
			});
			
		} else if (req.body.sport == config.sports.soccer) {
			arduinoserialport.setCourtLight(config.sports.soccer, function () {
			
				result.sport = config.sports.soccer;
				postResult(res, 200, result);
			});
			
		} else {
			arduinoserialport.setCourtLight(config.sports.volleyball, function () {
			
				result.sport = config.sports.volleyball;
				postResult(res, 200, result);
			});
		}
	});

	//calendar
	app.get('/calendar', isLoggedIn, function (req, res) {
		sidenavprovider.getBasePageModel(req, 'calendar', function (model) {
			var html = render.view(config.appPath + '/views/calendar.mustache', model);
			res.send(html);		
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

    // facebook routes
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