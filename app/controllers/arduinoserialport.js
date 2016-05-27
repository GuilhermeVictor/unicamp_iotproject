var arduinoserialport = function () {

	var serialport = require('serialport');

	var portName = '/dev/tty.usbmodem1411'; // you can get this value from Arduino IDE > Tools > Serial Port.
	var sp = new serialport.SerialPort(portName, {
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
	
	function write(data) {
		console.log('Writing data ' + data + ' to arduino.');
		sp.write(data);
	};
}

exports = arduinoserialport;