<?php
header("Content-Type:application/json");
require_once("config.php");

Class Helper
{
	public function connectDB()
	{
		$mysqli = new mysqli(MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD,MYSQL_DATABASE);
		if ($mysqli->connect_errno) {
		    return  $this->formatError("Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error);
		}

		return $mysqli;
	}

	public function listTable($query)
	{
		error_log($query);
		$mysqli=$this->connectDB();
		
		$rows=$mysqli->query($query);

		if (!$rows) 
		{
		    return $this->formatError($mysqli->error);
		}

		$result=array();
		while($row=$rows->fetch_assoc())
		{
			$result[]=$row;
		}

		return $result;
	}

	public function getRow($query)
	{
		$mysqli=$this->connectDB();
		
		$rows=$mysqli->query($query);

		if (!$rows) 
		{
		    return $this->formatError($mysqli->error);
		}

		$result=$rows->fetch_assoc();

		return $result;
	}

	public function insertRow($query)
	{
		error_log($query);
		$mysqli=$this->connectDB();
		
		$rows=$mysqli->query($query);

		if (!$rows) 
		{
		    return $this->formatError($mysqli->error);
		}

		return $rows;
	}

	public function formatError($message,$errorcode=NULL)
	{
		if(!empty($errorcode))
		{
			http_response_code($errorcode);
		}
		return array("error"=>$message);
	}
}
?>