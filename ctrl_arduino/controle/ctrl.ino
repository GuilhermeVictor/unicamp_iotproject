#include <Stepper.h>
#include "DWIN_Comm1.h"
DWIN_Comm DWIN(115200);
#include "SerialListener.h"
#include "cortina.h"
#define BAUD_RATE 115200

void setup(){

	Serial1.begin(115200);
	Serial.begin(9600);
	DWIN.setPage(4);

	//Determina a velocidade inicial do motor
	cortina.setSpeed(10);
}

void loop(){

	SerialListener();
	//cortina_open();
	cortina.step(-7500);
	delay(3000);
	cortina.step(7500);

}