<?php
require_once("../helper.php");
require_once("../classes/Company.class.php");

$helper=new Helper();
$companyObj=new Company();
var_dump($companyObj);
$result=$companyObj->login($_POST);
echo json_encode($result);
?>