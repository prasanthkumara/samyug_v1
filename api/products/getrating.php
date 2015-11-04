<?php
require_once("../helper.php");
require_once("../classes/User.class.php");
require_once("../classes/Products.class.php");

$helper=new Helper();
$userObj=new User();
$productObj=new Products();

if(($result=$userObj->checkLoggedIn())&&!isset($result['error']))
{
	if(empty($_POST['id']))
	{
		$result=array("error"=>"Missing parameters");
	}
	else
	{
		$result=$productObj->getProductRating($_POST['id']);
	}
}

echo json_encode($result);
?>