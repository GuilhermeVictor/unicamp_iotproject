#!/bin/bash

mongoPath="$1"

if [ ! -e index.js ]
then
	echo "index.js not found"
	exit 1
fi

if [ -z $mongoPath ] || [ ! -d $mongoPath ]
then
	echo "Usage: ./linux-start.sh /Path/to/mongodb/folder/"
	exit 1
fi

node index.js

cd $mongoPath
./bin/mongod --dbpath ./data/ --nojournal --auth

