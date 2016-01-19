<?php
require_once("../../helper.php");
require_once("../../config.php");
require_once("../../classes/User.class.php");

$helper=new Helper();
$userObj=new User();

$result=$userObj->listUsers();
echo json_encode($result);
?>