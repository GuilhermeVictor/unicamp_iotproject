//Listener de comandos do servidor

int lastPage = 3; // Registro do último esporte carregado

void SerialListener(){
	String cmd;
	if(Serial.available()){
		cmd = Serial.readStringUntil('\n');
		int var = cmd.toInt();
		switch(var){

			// QUADRA:
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

			// CORTINA:
			case 6:
				ST_Cortina_Open = 0;
				EEPROM.put(0, Step_Counter);
				ST_Cortina_Close = 1;
				break;
			case 7:
				ST_Cortina_Close = 0;
				EEPROM.put(0, Step_Counter);
				ST_Cortina_Open = 1;
				break;

			// DESPERTADOR:
			case 8:
				ST_Alarme_System = 1;
				break;


			// CORTINA MANUAL
			case 100:
				ST_Cortina_Up = 1;
				break;
			case 101:
				ST_Cortina_Down = 1;
				break;
			case 102:
				ST_Cortina_Up = 0;
				ST_Cortina_Down = 0;
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