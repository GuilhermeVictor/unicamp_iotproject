var config = {};

/* Web Application settings */

config.url = 'http://azulloft.com:8081'
config.appname = 'Azulloft'


/* Sport settings */
config.sports = {};

config.sports.on = 'on';
config.sports.off = 'off';
config.sports.tennis = 'tennis';
config.sports.bascketball = 'bascketball';
config.sports.soccer = 'soccer';
config.sports.volleyball = 'volleyball';


/* Arduino settings */
config.arduino = {};

config.arduino.portName = '/dev/ttyACM1'; // you can get this value from Arduino IDE > Tools > Serial Port.
config.arduino.courtTurnOn = '0';
config.arduino.courtTurnOff = '4';
config.arduino.courtSportTennis = '1';
config.arduino.courtSportBascketball = '0';
config.arduino.courtSportSoccer = '3';
config.arduino.courtSportVolleyball = '2';

	
module.exports = config;