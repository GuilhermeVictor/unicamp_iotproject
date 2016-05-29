function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}
 
function sendSerialData(data) {
   console.log(data);
}
 
function showPortClose() {
   console.log('Port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}

function write(data, sp) {
	console.log('Writing data ' + data + ' to arduino.');
	sp.write(data);
};
	
function ArduinoSerialPortController(config) {

	var serialport = require('serialport');
		
	var sp = new serialport.SerialPort(config.arduino.portName, {
		baudRate: 9600,
		dataBits: 8,
		parity: 'none',
		stopBits: 1,
		flowControl: false,
		parser: serialport.parsers.readline("\r\n")
	});
	
	sp.on('open', showPortOpen);
	sp.on('data', sendSerialData);
	sp.on('close', showPortClose);
	sp.on('error', showError);
	
	this.sp = sp;
	this.config = config;
}

ArduinoSerialPortController.prototype = {

	setCourtLight: function (status, done) {
		var config = this.config;
		
		if (status == config.sports.on) {
			write(config.arduino.courtTurnOn, this.sp);
			
		} else if (status == config.sports.off) {
			write(config.arduino.courtTurnOn, this.sp);
		}
		
		done(true);
	},
	
	setCourtSport: function (sport, done) {	
		var config = this.config;
		
		if (sport == config.sports.tennis) {
			write(config.arduino.courtSportTennis, this.sp);
			
		} else if (sport == config.sports.bascketball) {
			write(config.arduino.courtSportBascketball, this.sp);
			
		} else if (sport == config.sports.soccer) {
			write(config.arduino.courtSportSoccer, this.sp);
			
		} else if (sport == config.sports.volleyball) {
			write(config.arduino.courtSportVolleyball, this.sp);
		}
		
		done(true);
	}
}

module.exports = function(config) {
	return new ArduinoSerialPortController(config)
}