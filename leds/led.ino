#define INTERVAL 2000

int red_l   = 3,
    green_l = 4,
    cur_l;

unsigned long start_t,
              cur_t;

void setup() {
  // put your setup code here, to run once:
  pinMode(red_l, OUTPUT);
  pinMode(green_l, OUTPUT);

  start_t = millis(); // start time
  cur_l   = red_l;   // start with red led

  /* Turn on current LED */
  digitalWrite(cur_l, HIGH);

  Serial.begin(9600);
} 

void loop() {
  cur_t = millis();

  if (cur_t - start_t >= INTERVAL) {
    /* Turn off current LED, your time is up! */
    digitalWrite(cur_l, LOW);

    /* Switch color */
    if (cur_l == red_l) {
      cur_l = green_l;
    } else {
      cur_l = red_l;
    }

    /* Turn on new LED */
    digitalWrite(cur_l, HIGH);

    start_t = millis(); // get new start time
  }
}

