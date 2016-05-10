//carrega dependencias
var express = require('express');
var mustache = require('mustache');
var fs = require('fs');
var arduinoPort = require('./node_modules_custom/arduinoserialport')
var templatebuilder = require('./node_modules_custom/templatebuilder')
var config = require('./config');

//adiciona chave de configuracao no objeto config da aplicacao
config.appPath = __dirname;

var render = templatebuilder(config);
var app = express();

app.use(express.static(__dirname + '/static_content'));
	
//index
app.get('/', function (req, res) {	
	var html = render.view(__dirname + '/views/index.mustache', {});
	res.send(html);
});

//change sport call
app.post('/sports', function (req, res) {	
	console.log(req);	
	arduinoPort.write(1); // mandar comando pra trocar a quadra
});

//inicia servico
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});
