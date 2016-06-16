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
				//abre cortina
				break;
			case 7:
				//fecha cortina
				break;

			// DESPERTADOR:
			case 8:
				//desperta
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