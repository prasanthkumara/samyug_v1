<?php
require_once("../../helper.php");
require_once("../../classes/Admin.class.php");

$helper=new Helper();
$adminObj=new Admin();
$result=$adminObj->checkLoggedIn($_POST);
echo json_encode($result);
?>