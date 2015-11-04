<?php

Class Admin extends helper
{
	public function login($data)
	{
		extract($data);

		if(empty($email)||empty($password))
		{
			return $this->formatError("Missing parameters",400);
		}

		$result=$this->getRow(sprintf("SELECT * FROM users WHERE email='%s' AND
			 password='%s'  AND role='ADMIN'",$email,md5($password)));

		if(empty($result))
		{
			return $this->formatError("Invalid details provided");
		}

		session_start();
		$_SESSION['email']=$email;
		$_SESSION['id']=$result['id'];
		$_SESSION['first_name']=$result['first_name'];
		$_SESSION['last_name']=$result['last_name'];

		return $result;
	}

	public function checkLoggedIn()
	{
		if(empty($_SESSION))
		{
			session_start();
		}

		if(empty($_SESSION['id']))
		{
			return $this->formatError("Session not available");
		}

		$result["email"]=$_SESSION['email'];
		$result["id"]=$_SESSION['id'];
		$result["company_id"]=$_SESSION['company_id'];
		$result["first_name"]=$_SESSION['first_name'];
		$result["last_name"]=$_SESSION['last_name'];

		return $result;
	}

	public function logout()
	{
		if(!isset($_SESSION))
		{
			session_start();
		}

		session_destroy();
	}
}