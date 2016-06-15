<?php
	//header('Content-Type: text/html; charset=utf-8');

	$username = "root";
	$password = "123456";
	$hostname = "localhost"; 
	$dbname = "azul";

	//connection to the database
	$db = new mysqli($hostname, $username, $password, $dbname);
	
	if($db->connect_errno > 0){
	    die('Unable to connect to database [' . $db->connect_error . ']');
	}
	else{
		//echo "Connected to MySQL<br>";	
	}

	$db->query("SET NAMES 'utf8'");
	$db->query('SET character_set_connection=utf8');
	$db->query('SET character_set_client=utf8');
	$db->query('SET character_set_results=utf8');
?>