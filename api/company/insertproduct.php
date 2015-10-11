<?php
require_once("../helper.php");
require_once("../classes/Products.class.php");
require_once("../classes/Company.class.php");

$helper=new Helper();
$companyObj=new Company();
$productsObj=new Products();

if(($result=$companyObj->checkLoggedIn())&&!isset($result['error']))
{
	$result=$productsObj->insertProduct($result['company_id'],$_POST);
}

echo json_encode($result);
?>