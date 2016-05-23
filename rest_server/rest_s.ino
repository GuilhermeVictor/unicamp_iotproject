#include <SPI.h>
#include <Ethernet.h>

/* --- ethernet settings --- */

byte mac[] = { 0x90, 0xA2, 0xDA, 0x0D, 0x85, 0xD9 };   // physical mac address
byte ip[] = { 192, 168, 0, 108 };                      // ip in lan
byte subnet[] = { 255, 255, 255, 0 };                  // subnet mask
byte gateway[] = { 192, 168, 0, 1 };                   // default gateway

EthernetServer server(80);                             // server port

String request;

void setup()
{
    /* Start port */
    Serial.begin(9600); 

    Ethernet.begin(mac, ip, gateway, subnet);      // initialize Ethernet device
    server.begin();                                // start to listen for clients

    Serial.println("Attempt to initialize a REST server, from azuland!.\n");
}

void loop()
{
    EthernetClient client = server.available();    // look for the client

    /* Found! */
    if (client) {
        Serial.print("Conneceted successfully.\n");

        while (client.connected()) {
            Serial.print("I'm open to any requests!\n");

            if (request.length() < 100) {
                char c = client.read();
                request += c;
            }

            if (c == '\n') {
                Serial.println(request);

                /* deal with request */

                /* clean up */
                request = "";

                client.println("HTTP/1.1 200 OK");

                delay(1);
            }
        }
    }

    /*
    The following line is important because it will stop the client
    and look for the new connection in the next iteration i.e
    EthernetClient client = server.available();
    */
    client.stop();
}