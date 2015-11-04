<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
ini_set('display_startup_errors', true); 
	/*define("MYSQL_USERNAME","a4270346_samyug");
	define("MYSQL_PASSWORD","samyug123456");
	define("MYSQL_HOST","mysql10.000webhost.com");
	define("MYSQL_DATABASE","a4270346_samyug");*/
	define("MYSQL_USERNAME","root");
	define("MYSQL_PASSWORD","guddu007");
	define("MYSQL_HOST","localhost");
	define("MYSQL_DATABASE","samyug");
	define("HOST",$_SERVER['SERVER_NAME']);
	if(HOST=="furniture.samyug.localhost")
	{
		define("WEB_TYPE","FURNITURE");
	}
	else if(HOST=="furniture.samyug.localhost")
	{
		define("WEB_TYPE","FURNITURE");
	}
	else if(HOST=="furniture.samyug.localhost")
	{
		define("WEB_TYPE","FURNITURE");
	}
	
?>