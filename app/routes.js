// app/routes.js

module.exports = function(config, app, passport, render) {
	
	//index
	app.get('/', isLoggedIn, function (req, res) {	
		var html = render.view(config.appPath + '/views/index.mustache', {});
		res.send(html);
	});

	//change sport call
	app.post('/sports', function (req, res) {	
		console.log(req);	
		arduinoPort.write(1); // mandar comando pra trocar a quadra
	});

    // route for the login form
    app.get('/login', function(req, res) {	
        // render the page and pass in any flash data if it exists
		var message = req.flash('loginMessage') + '';		
		var hasMessage = (message != '');		
        
		var html = render.view_main(config.appPath + '/views/login.html', { hasMessage: hasMessage, message: message});
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