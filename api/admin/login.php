<?php
require_once("../helper.php");
require_once("../classes/Admin.class.php");

$helper=new Helper();
$companyObj=new Admin();
$result=$companyObj->login($_POST);
echo json_encode($result);
?>