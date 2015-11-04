<?php
require_once("../helper.php");
require_once("../classes/User.class.php");

$helper=new Helper();
$companyObj=new User();

$result=$companyObj->insertUser($_POST);
echo json_encode($result);
?>