<?php

Class Products extends helper
{
	public function listProducts()
	{

		$result=$this->listTable(sprintf("SELECT * FROM products"));

		return $result;
	}

	public function insertProduct($company_id,$data)
	{
		$result=$this->insertRow(sprintf("INSERT INTO products(company_id,title,price,description,image,created) VALUES('%s','%s','%s','%s','%s',NOW())",$company_id,$data['title'],$data['price'],$data['description'],$data['image']));

		if(isset($result['error']))
		{
			return $result;
		}

		return $result;
	}

	public function updateProduct($data)
	{
		$result=$this->insertRow(sprintf("UPDATE products SET title='%s',price='%s',description='%s',image='%s' WHERE id='%s'",$data['title'],$data['price'],$data['description'],$data['image'],$data['id']));

		if(isset($result['error']))
		{
			return $result;
		}

		return $result;
	}

	public function login($data)
	{
		extract($data);

		if(empty($email)||empty($password))
		{
			return $this->formatError("Missing parameters",400);
		}

		$result=$this->getRow(sprintf("SELECT * FROM users WHERE email='%s' AND
			 password='%s'",$email,$password));

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