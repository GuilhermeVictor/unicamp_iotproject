var config = {};

/* Web Application settings */

config.url = 'http://azulloft.com:8081'
config.appname = 'Azulloft'

config.locale = 'pt-BR';

/* Sport settings */
config.sports = {};

config.sports.on = 'on';
config.sports.off = 'off';
config.sports.tennis = 'tennis';
config.sports.bascketball = 'bascketball';
config.sports.soccer = 'soccer';
config.sports.volleyball = 'volleyball';

config.commands = {};
config.commands.curtain = {
	open: {
		name: 'curtain_open',
		description: 'Abrir cortinas',
		img: '/img/curtains_bathroom-128.png'
	},

	close: {
		name: 'curtain_close',
		description: 'Fechar cortinas',
		img: '/img/curtains_bathroom-close-128.png'
	}
};
config.commands.alarm = {	
	name: 'alarm',
	description: 'Tocar despertador',
	img: '/img/clock_32.png'	
};

/* Arduino settings */
config.arduino = {};

config.arduino.portName = '/dev/ttyACM0'; // you can get this value from Arduino IDE > Tools > Serial Port.
config.arduino.courtTurnOn = '1';
config.arduino.courtTurnOff = '0';
config.arduino.courtSportTennis = '2';
config.arduino.courtSportBascketball = '3';
config.arduino.courtSportSoccer = '4';
config.arduino.courtSportVolleyball = '5';
config.arduino.curtainOpen = '6';
config.arduino.curtainClose = '7';
config.arduino.doBuzz = '8';
	
module.exports = config;