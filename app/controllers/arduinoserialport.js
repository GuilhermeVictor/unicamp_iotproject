function showPortOpen() {
   //console.log('port open. Data rate: ' + myPort.options.baudRate);
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

	var controller = this;

	var serialport = require('serialport');	
	
	var foundArduino = false;
	
	// tenta encontrar a porta do arduino:
	serialport.list(function (err, ports) {
		
		for (var i = 0; i < ports.length; i++) {
			var port = ports[i];
			
			console.log('Tentando abrir { comName: ' + port.comName + ', manufacturer: ' + port.manufacturer + ' }');			

			/* example port information 
			{
				comName: '/dev/cu.usbmodem1421',
				manufacturer: 'Arduino (www.arduino.cc)',
				serialNumber: '757533138333964011C1',
				pnpId: undefined,
				locationId: '0x14200000',
				vendorId: '0x2341',
				productId: '0x0043'
			} */
			
			if ((port.manufacturer + '').toLowerCase().indexOf('arduino') > 0) {
				config.arduino.portName = port.comName;
				foundArduino = true;
			}
		};
		
		if (foundArduino) {
			
		} else {
			console.log('Arduino não encontrado. Tentando na porta default: ' + config.arduino.portName);
		}		
	
		var sp = new serialport.SerialPort(config.arduino.portName, {
			baudRate: 9600,
			dataBits: 8,
			parity: 'none',
			stopBits: 1,
			flowControl: false,
			parser: serialport.parsers.readline("\n")
		});
		
		sp.on('open', showPortOpen);
		sp.on('data', sendSerialData);
		sp.on('close', showPortClose);
		sp.on('error', showError);
		
		controller.sp = sp;
		controller.config = config;
	});
}

ArduinoSerialPortController.prototype = {

	setCourtLight: function (status, done) {
		var config = this.config;
		
		if (status == config.sports.on) {
			write(config.arduino.courtTurnOn, this.sp);
			
		} else if (status == config.sports.off) {
			write(config.arduino.courtTurnOff, this.sp);
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
	},
	
	//abre/fecha a cortina
	setCurtainStatus: function (command, done) {
		var config = this.config;
		
		if (command == config.commands.curtain.open.name) {
			write(config.arduino.curtainOpen, this.sp);
			
		} else if (command == config.commands.curtain.close.name) {
			write(config.arduino.curtainClose, this.sp);
		}
		
		done(true);
	},
	
	//toca o buzzer
	buzz: function (done) {
		var config = this.config;
		
		write(config.arduino.doBuzz, this.sp);
		
		done(true);
	},

	coffe: function (done) {
		var config = this.config;

		write(config.arduino.makeCoffe, this.sp);

		done(true);
	},
	
	setLightStatus: function (room, lightStatus, done) {
		var config = this.config;
		
		if (room == config.lights.room.kitchen) {
			if (lightStatus == config.lights.status.on)
				write(config.arduino.kitchen_on, this.sp);
			else
				write(config.arduino.kitchen_off, this.sp);
			
		} else if (room == config.lights.room.bedroom) {
			if (lightStatus == config.lights.status.on)
				write(config.arduino.bedroom_on, this.sp);
			else
				write(config.arduino.bedroom_off, this.sp);
			
		} else if (room == config.lights.room.living_room) {
			if (lightStatus == config.lights.status.on)
				write(config.arduino.living_room_on, this.sp);
			else
				write(config.arduino.living_room_off, this.sp);
			
		} else if (room == config.lights.room.outside) {
			if (lightStatus == config.lights.status.on)
				write(config.arduino.outside_on, this.sp);
			else
				write(config.arduino.outside_off, this.sp);
			
		}

		done(true);
	}
}

module.exports = function(config) {
	return new ArduinoSerialPortController(config)
}