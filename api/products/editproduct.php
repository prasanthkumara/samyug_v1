<?php
require_once("../helper.php");
require_once("../classes/User.class.php");
require_once("../classes/Products.class.php");

$helper=new Helper();
$userObj=new User();
$productObj=new Products();

if(($result=$userObj->checkLoggedIn())&&!isset($result['error']))
{
	$result=$productObj->updateProduct($_POST);
}

echo json_encode($result);
?>