<?php
require_once("../../helper.php");
require_once("../../classes/User.class.php");

$helper=new Helper();
$userObj=new User();
$result=$userObj->insertUser($_POST);
echo json_encode($result);
?>