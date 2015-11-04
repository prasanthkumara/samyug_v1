<?php

Class User extends helper
{
	public function listUsers()
	{

		$result=$this->listTable(sprintf("SELECT * FROM company"));

		if(empty($result))
		{
			return $this->formatError("No companies found");
		}

		return $result;
	}

	public function insertEducation($user_id,$data)
	{
		
		$result=$this->insertRow(sprintf("INSERT INTO education(user_id,institution,qualification,period_start,period_end,created) VALUES('%s','%s','%s','%s','%s',NOW())",$user_id,$data['institution'],$data['qualification'],$data['period_start'],$data['period_end']));

		if(!$result)
		{
			return $this->formatError("Insert failed");
		}

		return $result;
	}

	public function editEducation($user_id,$data)
	{
		
		$result=$this->insertRow(sprintf("UPDATE education SET institution='%s',qualification='%s',period_start='%s',period_end='%s' WHERE user_id='%s' AND id='%s'",$data['institution'],$data['qualification'],$data['period_start'],$data['period_end'],$user_id,$data['id']));

		if(!$result)
		{
			return $this->formatError("Insert failed");
		}

		return $result;
	}

	public function insertUser($data)
	{
		if(isset($data['email']))
		{
			$this->checkUser($data['email']);
		}
		$result=$this->insertRow(sprintf("INSERT INTO users(first_name,last_name,email,password) VALUES('%s','%s','%s','%s')",$data['first_name'],$data['last_name'],$data['email'],$data['password']));

		if(!$result)
		{
			return $this->formatError("Insert failed");
		}

		return $result;
	}

	public function checkUser($email)
	{
		$result=$this->getRow(sprintf("SELECT * FROM users WHERE email='%s'",$email));

		if(empty($result))
		{
			return $this->formatError("Email already exists");
		}

		return true;
	}

	public function login($data)
	{
		extract($data);

		if(empty($email)||empty($password))
		{
			return $this->formatError("Missing parameters",400);
		}

		$result=$this->getRow(sprintf("SELECT * FROM users WHERE email='%s' AND
			 password='%s'",$email,password_hash($password,PASSWORD_BCRYPT)));

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
		$result["first_name"]=$_SESSION['first_name'];
		$result["last_name"]=$_SESSION['last_name'];

		return $result;
	}
}