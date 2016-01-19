<?php

Class Products extends helper
{
	public function listProducts($company_id) 
	{
		$result=$this->listTable(sprintf("SELECT * FROM products a LEFT JOIN company b ON a.company_id=b.id WHERE company_id='%s' AND category='%s'",$company_id,WEB_TYPE));

		return $result;
	}

	public function listComments($company_id,$product_id)
	{

		$result=$this->listTable(sprintf("SELECT * FROM product_comments a LEFT JOIN users b ON a.user_id=b.id WHERE product_id='%s'",$product_id));

		return $result;
	}

	public function getProducts($company_id,$product_id)
	{

		$result=$this->getRow(sprintf("SELECT * FROM products WHERE company_id='%s' AND id='%s'",$company_id,$product_id));

		return $result;
	}

	public function insertProduct($company_id,$data)
	{
		$query="INSERT INTO products(company_id,title,price,description,image,created) VALUES('%s','%s','%s','%s','%s',NOW())";
		$result=$this->insertRow($query,array($company_id,$data['title'],$data['price'],$data['description'],$data['image']));

		if(isset($result['error']))
		{
			return $result;
		}

		return $result;
	}

	public function updateProduct($data)
	{
		$query="UPDATE products SET title='%s',price='%s',description='%s',image='%s' WHERE id='%s'";
		$queryData[0]=$data['title'];
		$queryData[1]=$data['price'];
		$queryData[2]=$data['description'];
		$queryData[3]=$data['image'];
		$queryData[4]=$data['id'];
		$result=$this->insertRow($query,$queryData);

		if(isset($result['error']))
		{
			return $result;
		}

		return $result;
	}

	public function rateProduct($rate,$id)
	{
		if(empty($rate)||empty($id))
		{
			return array("error"=>"Invalid parameters");
		}

		$query="INSERT INTO rating (rate,id) VALUES ('%s','%s')";
		$queryData[0]=$rate;
		$queryData[1]=$id;
		$result=$this->insertRow($query,$queryData);

		if(isset($result['error']))
		{
			return $result;
		}

		return $result;
	}

	public function getProductRating($id)
	{
		$result=$this->getRow(sprintf("SELECT SUM(rate) DIV COUNT(*) AS rate FROM rating WHERE id='%s' AND ratingtype='PRODUCT'",$id));

		return $result;
	}

	public function listCategories()
	{
		$result=$this->listTable(sprintf("SELECT DISTINCT category FROM products WHERE deleted=0"));

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