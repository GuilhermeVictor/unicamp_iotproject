#!/bin/bash

#define cores
COLOR_NC='\e[0m'
COLOR_R='\e[1;31m'

#recebe argumento
mongoPath="$1"

#checa se index.js existe
if [ ! -e index.js ]
then
	echo "index.js not found"
	exit 1
fi

#checa se o argumento nao e vazio e se existe e e um diretorio
if [ -z $mongoPath ] || [ ! -d $mongoPath ]
then
	echo "Usage: ./linux-start.sh /Path/to/mongodb/folder/"
	exit 1
fi

#entra na pasta do mongodb e executa o comando
cd $mongoPath
./bin/mongod --dbpath ./data/ --nojournal --auth &> /dev/null & 
mongodPID=$!

# retorna para a pasta anterior
cd - &> /dev/null

# roda node em background
node index.js &> /dev/null &
wait $!

# em caso de erro do node, mata mongod e sai
if [ $? -ne 0 ]
then
	kill -9 $mongodPID

    echo -en $COLOR_R
	echo "'node index.js' error"
    echo -en $COLOR_NC

	exit 1
fi

wait