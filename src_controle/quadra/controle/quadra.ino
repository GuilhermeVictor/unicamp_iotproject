#include "DWIN_Comm1.h"
#define BAUD_RATE 115200

DWIN_Comm DWIN(115200);

void setup(){

	Serial1.begin(115200);
	Serial.begin(9600);
	DWIN.setPage(4);
}

int lastPage = 3;
void loop(){

	String cmd;
	if(Serial.available()){
		cmd = Serial.readStringUntil('\n');
		int var = cmd.toInt();
		switch(var){
			case 0:
				lastPage = DWIN.page();
				DWIN.setPage(4);
				break;
			case 1:
				DWIN.setPage(lastPage);
				break;
			case 2:
				DWIN.setPage(1);
				break;
			case 3:
				DWIN.setPage(0);
				break;
			case 4:
				DWIN.setPage(3);
				break;
			case 5:
				DWIN.setPage(2);
				break;
			default:
				DWIN.setPage(4);
				break;
		}
		Serial.println(cmd);
	} else {
		return;
	}

}