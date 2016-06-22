#include <Stepper.h>
#include "DWIN_Comm1.h"
DWIN_Comm DWIN(115200);
#include "cortina.h"
#include "alarme.h"
#include "SerialListener.h"

#define BAUD_RATE 115200

void setup(){

	Serial1.begin(115200);
	Serial.begin(9600);
	DWIN.setPage(4);
	alarme_setup();
	cortina_setup();

}

void loop(){

	SerialListener();
	if(ST_Cortina_Open){
		cortina_open();
	}
	if(ST_Cortina_Close){
		cortina_close();
	}
	if(ST_Alarme_System){
		alarme();
	}

}