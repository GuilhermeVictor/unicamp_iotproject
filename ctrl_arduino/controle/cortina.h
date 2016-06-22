// Controle do motor da cortina
const int stepsPerRevolution = 2037;
  
//Inicializa a biblioteca utilizando as portas de 8 a 11 para 
//ligacao ao motor 
Stepper cortina(stepsPerRevolution, 8,10,9,11); 

int ST_Cortina_Open = 0;
int ST_Cortina_Close = 0;
int Step_Counter = 0;

void cortina_setup(){
	//Determina a velocidade inicial do motor
	cortina.setSpeed(10);
}

int cortina_open(){

	switch(ST_Cortina_Open){
		case 0:
			ST_Cortina_Open = 1;
			EEPROM.get(0, Step_Counter);
			break;
		case 1:
			if(Step_Counter < 4500){
				cortina.step(10);
				Step_Counter = Step_Counter + 10;
				Serial.println(Step_Counter);
				return 0;
			} else {
				ST_Cortina_Open = 0;
				EEPROM.put(0, Step_Counter);
				return 1;
			}
			break;
		default:
			ST_Cortina_Open = 0;
			break;
	}
	return 0;

}

int cortina_close(){

	switch(ST_Cortina_Close){
		case 0:
			ST_Cortina_Close = 1;
			EEPROM.get(0, Step_Counter);
			break;
		case 1:
			if(Step_Counter > 0){
				cortina.step(-10);
				Step_Counter = Step_Counter - 10;
				Serial.println(Step_Counter);
				return 0;
			} else {
				ST_Cortina_Close = 0;
				EEPROM.put(0, Step_Counter);
				return 1;
			}
			break;
		default:
			ST_Cortina_Close = 0;
			break;
	}
	return 0;
}

int ST_Cortina_Up = 0;
void cortina_up(){
	if(ST_Cortina_Up){
		cortina.step(10);
	}
}

int ST_Cortina_Down = 0;
void cortina_down(){
	if(ST_Cortina_Down){
		cortina.step(-10);
	}
}