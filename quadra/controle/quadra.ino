#include "DWIN_Comm1.h"
#define BAUD_RATE 115200

DWIN_Comm DWIN(BAUD_RATE);

void setup(){

	Serial1.begin(BAUD_RATE);
	Serial.begin(BAUD_RATE);
}

void loop(){

	String cmd;
	int page = 0;
	if(Serial.available()){
		cmd = Serial.readStringUntil('\n');
		DWIN.setPage(cmd.toInt());
	} else {
		return;
	}

}