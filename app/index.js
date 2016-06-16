//carrega dependencias
var express = require('express');
var fs = require('fs');
var mustache = require('mustache');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
//var redis      = require('connect-redis')(express);
var schedule	 = require('node-schedule');
var moment       = require('moment');

var templatebuilder = require('./utility/templatebuilder')
var config 			= require('./config/config');
var routes 			= require('./routes');
var configDB 		= require('./config/database.js');
var taskScheduler 	= require('./controllers/taskscheduler')(config);

require('./config/passport')(passport); // passa passport para ser configurado

// adiciona chaves de configuracoes no objeto config da aplicacao
config.appPath = __dirname;
config.port = 8081;

var app = express();
var render = templatebuilder(config, fs, mustache);
var arduinoserialport = require('./controllers/arduinoserialport')(config);
var taskScheduler = require('./controllers/taskscheduler')(config, arduinoserialport);

// set up our express application
app.set('view engine', 'mustache'); // set up mustache for templating
//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // get information from html forms
app.use(express.static(config.appPath + '/static_content'));

// required for passport
app.use(session({
  // TODO colocar sessao no redis para nao perder sessao quando restartar o app   
  // store: new RedisStore({
  //   host: 'localhost',
  //   port: 6379,
  //   db: 2,
  //   pass: 'RedisPASS'
  // }),
  // cookie: { maxAge: 1200 },
	secret: '879Uhas789Hnuiaoiqwue8712asSidA',
	resave: false,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// kill sessao do usuario a cada X minutos
// app.use(function(req, res, next) {
//   if (now() > req.session.cookie.expires) {
//     req.session = null;
//     req.session.destroy();
//   }  
  
//   next();
// });

// configuracoes
mongoose.connect(configDB.url); // connect to our database
//mongoose.set('debug', true);
routes(config, app, passport, render, arduinoserialport, taskScheduler);

//inicia servico
app.listen(config.port, function () {
  console.log('Example app listening on port ' + config.port + '!');
});
	
//running a task every two minutes
schedule.scheduleJob({ second : 0 }, function() {
	
	taskScheduler.doCommandJob(function (err) {
		if (err)
			throw err;
		
		console.log('Command job executed at ' + moment().locale('pt-BR').format() + '.');
	});
});