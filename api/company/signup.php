<?php
require_once("../helper.php");
require_once("../classes/Company.class.php");
require_once("../classes/User.class.php");

$helper=new Helper();
$companyObj=new Company();

$result=$companyObj->insertCompany($_POST);
echo json_encode($result);
?>