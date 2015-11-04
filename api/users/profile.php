<?php
require_once("../helper.php");
require_once("../classes/Company.class.php");

$helper=new Helper();
$companyObj=new Company();

if(($result=$companyObj->checkLoggedIn())&&!isset($result['error']))
{
	$result=$companyObj->profile($result['id']);
}

echo json_encode($result);
?>