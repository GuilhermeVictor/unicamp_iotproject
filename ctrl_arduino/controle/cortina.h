// Controle do motor da cortina
const int stepsPerRevolution = 2037;
  
//Inicializa a biblioteca utilizando as portas de 8 a 11 para 
//ligacao ao motor 
Stepper cortina(stepsPerRevolution, 8,10,9,11); 

int ST_Cortina = 0;
int Step_Counter = 0;

int cortina_open(){

	//switch(ST_Cortina):
		//case 0:
		//	if(Step_Counter)

 //Gira o motor no sentido horario a 90 graus
 for (int i = 0; i<=3; i++)
 {
 cortina.step(-512); 
 }
  
 //Gira o motor no sentido anti-horario a 120 graus
 for (int i = 0; i<=2; i++)
 {
 cortina.step(682); 
 }
 
 //Gira o motor no sentido horario, aumentando a
 //velocidade gradativamente
 for (int i = 10; i<=60; i=i+10)
 {
 cortina.setSpeed(i);
 cortina.step(40*i);
 }
}