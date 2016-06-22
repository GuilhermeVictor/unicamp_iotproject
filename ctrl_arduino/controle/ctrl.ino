#include <Stepper.h>
#include <EEPROM.h>
#include "DWIN_Comm1.h"
DWIN_Comm DWIN(115200);
#include "cortina.h"
#include "alarme.h"
#include "SerialListener.h"

#define BAUD_RATE 115200

void eeprom_clear(){
	int s = 0;
	EEPROM.get(10, s);
	if(s == 0){
		for (int i = 0 ; i < EEPROM.length() ; i++) {
    		EEPROM.write(i, 0);
  		}
  		s = 1000;
  		EEPROM.put(10, s);
	}
	Serial.println("EEPROM Clear");
}


void setup(){

	Serial1.begin(115200);
	Serial.begin(9600);
	DWIN.setPage(4);
	alarme_setup();
	cortina_setup();

	eeprom_clear();

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

	if(ST_Cortina_Up){
		cortina_up();
	}

	if(ST_Cortina_Down){
		cortina_down();
	}

}