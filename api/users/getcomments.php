<?php
require_once("../helper.php");
require_once("../classes/Products.class.php");
require_once("../classes/Company.class.php");

$helper=new Helper();
$productObj=new Products();
$companyObj=new Company();

if(($result=$companyObj->checkLoggedIn())&&!isset($result['error']))
{
	$result=$productObj->listComments($result['company_id'],$_POST['id']);
}

echo json_encode($result);
?>	