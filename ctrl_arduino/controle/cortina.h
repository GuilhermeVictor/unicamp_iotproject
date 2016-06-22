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
			break;
		case 1:
			if(Step_Counter < 4500){
				cortina.step(10);
				Step_Counter = Step_Counter + 10;
				Serial.println(Step_Counter);
				return 0;
			} else {
				ST_Cortina_Open = 0;
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
			break;
		case 1:
			if(Step_Counter > 0){
				cortina.step(-10);
				Step_Counter = Step_Counter - 10;
				Serial.println(Step_Counter);
				return 0;
			} else {
				ST_Cortina_Close = 0;
				return 1;
			}
			break;
		default:
			ST_Cortina_Close = 0;
			break;
	}
	return 0;
}