MongoDB
---------------------------------------------------------
1 - Instale e configure [MongoDB 3.2.6](https://www.mongodb.org/) 
OBS.: NAO configure as pastas de dados nem de binários dentro do repositório git.

2 - (Windows) Se estiver faltando MSVCP120.dll
baixe e instale vcredist_x64 ou vcredist_x86 (http://www.microsoft.com/en-GB/download/details.aspx?id=40784)

3 - (Windows) Se estiver faltando SSLEAY32.dll
baixe e instale Win32 OpenSSL (https://slproweb.com/products/Win32OpenSSL.html)


MongoDB Users
---------------------------------------------------------
1 - Abra um terminal e inicie o serviço do mongodb:
(Windows) C:\mongodb\bin\mongod --dbpath C:\mongodb\data --nojournal --auth

2 - Abra outro terminal e inicie o shell do mongo:
(Windows) C:\mongodb\bin\mongo admin

3 - Execute dentro do mongo shell:
db.createUser({user:"admin", pwd:"mc426",roles:["userAdminAnyDatabase"]});
exit

4 - Abra o mongo shell com o usuário admin:
(Windows) C:\mongodb\bin\mongo admin -u admin -p mc426 --authenticationDatabase admin

5 - Execute dentro do mongo shell:
use azulloft_db
db.createUser({user:"azulloft", pwd:"mc426", roles:["readWrite"]});
exit

6 - Feche os dois terminais.


GIT
---------------------------------------------------------
nothing to do yet :)


DNS
---------------------------------------------------------
1 - Configure a seguinte entrada de dns na sua máquina:
127.0.0.1 azulloft.com


Node JS
---------------------------------------------------------
1 - Instale [Node](https://nodejs.org/en/download/) 

2 - Dentro dessa pasta, execute no terminal:
(WINDOWS) start.bat
(LINUX) ./start.sh


FINALMENTE
---------------------------------------------------------
Acesse http://azulloft.com:8081/