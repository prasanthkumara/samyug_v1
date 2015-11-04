<?php
require_once("../helper.php");
require_once("../classes/Company.class.php");

$helper=new Helper();
$companyObj=new Company();

$result=$companyObj->logout();
echo json_encode($result);
?>