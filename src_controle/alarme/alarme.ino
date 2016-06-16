#include <Arduino.h>
int PIN_Buzzer = 2;
int PIN_Snooze = 3;

void setup(){
	pinMode(PIN_Buzzer, OUTPUT);
	pinMode(PIN_Snooze, INPUT_PULLUP);
}

unsigned long T_Old_millis = 0;
int ST_Alarme = 0;
void loop(){
	switch(ST_Alarme){
		case 0:
			//Liga alarme
			if((millis() - T_Old_millis) >= 500){
				T_Old_millis = millis();
				ST_Alarme = 1;
				digitalWrite(PIN_Buzzer, HIGH);
			}
			if(!digitalRead(PIN_Snooze)){
				ST_Alarme = 2;
			}
			break;
		case 1:
			//Desliga alarme
			if((millis() - T_Old_millis) >= 1000){
				digitalWrite(PIN_Buzzer, LOW);
				ST_Alarme = 0;
				T_Old_millis = millis();
			}
			if(!digitalRead(PIN_Snooze)){
				ST_Alarme = 2;
			}
			break;
		case 2:
			//Snooze
			digitalWrite(PIN_Buzzer, LOW);
			T_Old_millis = millis();
			ST_Alarme = 3;
			break;
		case 3:
			if(millis() - T_Old_millis >= 5000){
				ST_Alarme = 0;
			}
			break;
		default:
			ST_Alarme = 0;
	}

}