<?php
require_once("../helper.php");
require_once("../classes/Products.class.php");
require_once("../classes/Company.class.php");

$helper=new Helper();
$productObj=new Products();
$companyObj=new Company();

if(($result=$companyObj->checkLoggedIn())&&!isset($result['error']))
{
	$result=$productObj->listProducts($result['company_id']);
}

echo json_encode($result);
?>	