//Programa: Automacao Residencial com Arduino e Ethernet Shield
//Autor: FILIPEFLOP
 
#include <SPI.h>
#include <Ethernet.h>
#include "DHTstable/dht.h"
String readString;
 
int pino_rele1 = 3;
int pino_rele2 = 4;
boolean ligado = true;
boolean ligado_2 = true;
 
//Informacoes de endereco IP, gateway, mascara de rede
byte mac[] = { 0xA4, 0x28, 0x72, 0xCA, 0x55, 0x2F };
byte ip[] = { 192, 168, 0, 110 };
byte gateway[] = { 192, 168, 0, 1 };
byte subnet[] = { 255, 255, 255, 0 };
 
EthernetServer server(80);
 
dht DHT;

#define DHT11_PIN 5

void setup()
{
  Serial.begin(115200);
  pinMode(pino_rele1, OUTPUT);
  pinMode(pino_rele2, OUTPUT);
  pinMode(DHT11_PIN, INPUT);
 
  //Inicializa Ethernet Shield
  Ethernet.begin(mac, ip, gateway, subnet);
  server.begin();
 
  Serial.println("FILIPEFLOP - Automacao Residencial"); // so I can keep track of what is loaded
 
  //Desliga os dois reles
  digitalWrite(pino_rele1, HIGH);
  digitalWrite(pino_rele2, HIGH);
}
 
void loop()
{

  // READ DATA
  Serial.print("DHT11, \t");
  int chk = DHT.read11(DHT11_PIN);
  switch (chk)
  {
    case DHTLIB_OK:  
    Serial.print("OK,\t"); 
    break;
    case DHTLIB_ERROR_CHECKSUM: 
    Serial.print("Checksum error,\t"); 
    break;
    case DHTLIB_ERROR_TIMEOUT: 
    Serial.print("Time out error,\t"); 
    break;
    default: 
    Serial.print("Unknown error,\t"); 
    break;
  }
  // DISPLAY DATA
  Serial.print(DHT.humidity, 1);
  Serial.print(",\t");
  Serial.println(DHT.temperature, 1);

  delay(2000);

  EthernetClient client = server.available();
  if (client) {
    while (client.connected())
    {
      if (client.available())
      {
        char c = client.read();
        if (readString.length() < 100) {
          readString += c;
        }
        if (c == '\n')
        {
          //Controle do rele1
          Serial.println(readString);
          //Liga o Rele 1
          if (readString.indexOf("?ligar") > 0)
          {
            digitalWrite(pino_rele1, LOW);
            Serial.println("Rele 1 Ligado");
            ligado = false;
          }
          else
          {
            //Desliga o Rele 1
            if (readString.indexOf("?desligar") > 0)
            {
              digitalWrite(pino_rele1, HIGH);
              Serial.println("Rele 1 Desligado");
              ligado = true;
            }
          }
 
          //Controle do rele2
          Serial.println(readString);
          //Liga o Rele 2
          if (readString.indexOf("?2_ligar") > 0)
          {
            digitalWrite(pino_rele2, LOW);
            Serial.println("Rele 2 Ligado");
            ligado_2 = false;
          }
          else
          {
            //Desliga o Rele 2
            if (readString.indexOf("?2_desligar") > 0)
            {
              digitalWrite(pino_rele2, HIGH);
              Serial.println("Rele 2 Desligado");
              ligado_2 = true;
            }
          }
          readString = "";
 
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println();
          client.println("<html>");
          client.println("<head>");
          client.println("<title>FILIPEFLOP - Automacao Residencial</title>");
          client.println("<meta http-equiv='Content-Type' content='text/html; charset=ISO-8859-1'>");
          client.println("<meta name='viewport' content='width=720, initial-scale=0.5' />");
          client.println("<link rel='stylesheet' type='text/css' href='http://img.filipeflop.com/files/download/automacao/automacao_residencial.css' />");
          client.println("<script type='text/javascript' src='http://img.filipeflop.com/files/download/automacao/automacao_residencial.js'></script>");
          client.println("</head>");
          client.println("<body>");
          client.println("<div id='wrapper'><img alt='FILIPEFLOP' src='http://img.filipeflop.com/files/download/automacao/logoFF.jpg'/><br/>");
          client.println("<div id='div0' style=\"margin-left:200px\">Temperatura</div>");
          client.println("<input type=\"button\" value=\"Atualizar Temperatura\" onclick=\"reload()\"/>");
          client.println("<div id='div1'>Rele 1</div>");
          client.println("<div id='div2'>Rele 2</div>");
          client.print("<div id='rele'></div><div id='estado' style='visibility: hidden;'>");
          client.print(ligado);
          client.println("</div>");
          client.println("<div id='botao'></div>");
          client.println("<div id='botao_2'></div>");
          client.print("<div id='rele_2'></div><div id='estado_2' style='visibility: hidden;'>");
          client.print(ligado_2);
          client.println("</div>");
          client.println("</div>");
          client.println("<script>AlteraRele1()</script>");
          client.println("<script>AlteraRele2()</script>");
          client.println("<script>function reload() { this.location.href=this.location.href; }</script>");
          client.println("</div>");
          client.println("</body>");
          client.println("</head>");
 
          delay(1);
          client.stop();
        }
      }
    }
  }
}