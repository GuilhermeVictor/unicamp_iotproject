#include "DWIN_Comm1.h"
#define BAUD_RATE 115200

DWIN_Comm DWIN(115200);

void setup(){

	Serial1.begin(115200);
	Serial.begin(9600);
}

void loop(){

	String cmd;
	int page = 0;
	if(Serial.available()){
		cmd = Serial.readStringUntil('\n');
		DWIN.setPage(cmd.toInt());
		//Serial.println(cmd.toInt());
		Serial.println(cmd);
	} else {
		return;
	}

}