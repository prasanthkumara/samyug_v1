<?php

Class Company extends helper
{
	public function listCompanies()
	{

		$result=$this->listTable(sprintf("SELECT * FROM company"));

		if(empty($result))
		{
			return $this->formatError("No companies found");
		}

		return $result;
	}

	public function profile($user_id)
	{
		$result=$this->getRow(sprintf("SELECT a.id,first_name,last_name,email,b.* FROM users a LEFT JOIN company b ON a.id=b.user_id WHERE a.id='%s'",$user_id));

		$education=$this->listTable(sprintf("SELECT * FROM education WHERE user_id='%s'",$user_id));

		$result["education"]=$education;

		return $result;
	}

	public function insertCompany($data)
	{
		if(isset($data['email']))
		{
			$userObj=new User();
			if($emailCheck=$userObj->checkUser($data['email'])&&isset($emailCheck['error']))
			{
				return $emailCheck;
			}
		}
		//check buiness details
		if($businessCheck=$this->checkBusiness($data['business_id'])&&isset($businessCheck['error']))
		{
			return $emailCheck;
		}
		$result=$this->insertRow(sprintf("INSERT INTO company(name,sub_title,description,business_id,created) VALUES('%s','%s','%s','%s',NOW())",$data['name'],$data['sub_title'],$data['description'],$data['business_id']));

		if(isset($result['error']))
		{
			return $result;
		}

		$result=$this->insertRow(sprintf("INSERT INTO users(email,password,role,created) VALUES ('%s','%s','COMPANY',NOW())",$data['email'],$data['password']));

		if(!$result)
		{
			return $this->formatError("Insert failed");
		}

		return $result;
	}



	public function updateProfile($data)
	{
		
	}

	public function checkBusiness($id)
	{
		$result=$this->getRow(sprintf("SELECT * FROM company WHERE business_id='%s'",$id));

		if(empty($result))
		{
			return $this->formatError("Company with company id exists");
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

		$result=$this->getRow(sprintf("SELECT *,b.id AS company_id FROM users a LEFT JOIN company b ON a.id=b.user_id WHERE email='%s' AND
			 password='%s'",$email,$password));

		if(empty($result))
		{
			return $this->formatError("Invalid details provided");
		}

		session_start();
		$_SESSION['email']=$email;
		$_SESSION['id']=$result['id'];
		$_SESSION['company_id']=$result['company_id'];
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