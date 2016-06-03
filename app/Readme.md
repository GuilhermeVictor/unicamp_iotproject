## MongoDB

Instale [MongoDB 3.2.6](https://www.mongodb.org/)  
Obs: **Não** configure as pastas de dados nem de binários dentro do repositório git.

**(Windows)**  

* Se estiver faltando MSVCP120.dll baixe e instale [vcredist_x64 ou vcredist_x86](http://www.microsoft.com/en-GB/download/details.aspx?id=40784)
* Se estiver faltando SSLEAY32.dll
baixe e instale Win32 [OpenSSL](https://slproweb.com/products/Win32OpenSSL.html)

##MongoDB Users

Abra um terminal, (para linux abra dentro da pasta do mongodb):  
`C:\mongodb\bin\mongod --dbpath C:\mongodb\data --nojournal --auth`   
`./bin/mongod --dbpath ./data/ --nojournal --auth`

Abra outro terminal e inicie o shell do mongo:  
`C:\mongodb\bin\mongo admin`   
`./bin/mongo admin`

Execute dentro do mongo shell:  
`db.createUser({user:"admin", pwd:"mc426",roles:["userAdminAnyDatabase"]});  
exit`

Abra o mongo shell com o usuário admin:  
`C:\mongodb\bin\mongo admin -u admin -p mc426 --authenticationDatabase admin`  
`./bin/mongo admin -u admin -p mc426 --authenticationDatabase admin`

Execute dentro do mongo shell:  
`use azulloft_db  
db.createUser({user:"azulloft", pwd:"mc426", roles:["readWrite"]});  
exit`

##DNS
Configure a seguinte entrada de dns na sua máquina:  

* 127.0.0.1 azulloft.com

##Node JS
Instale [Node](https://nodejs.org/en/download/) 

Instale as dependencias para o app funcionar executando no terminal:  
`install.bat `  ou  
`./install.sh`

Dentro dessa pasta, execute no terminal:   
`start.bat `  ou  
`./linux-start.sh /Path/to/mongodb/folder`

##Finalmente
Acesse o [site](http://azulloft.com:8081/)

##Conectar ao RPi

Configure o DNS dessa maneira (/etc/hosts/ ou C:/Windows/System32/drivers/etc/hosts):
* 152.249.238.194 azulloft.com

Utilizando um cliente SSH:
- Conecte a azulloft.com:22
- User: pi
- Senha: azulloft

Comandos:
- `pm2 restart index`: Reinicia o servidor
- `pm2 stop index`: Para o servidor (útil caso queira rodar manualmente para ver os outputs)
	
Senha da chave do Git, para dar `git pull`:
- azulloft
