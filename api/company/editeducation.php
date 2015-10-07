<?php
require_once("../helper.php");
require_once("../classes/User.class.php");

$helper=new Helper();
$userObj=new User();

if(($result=$userObj->checkLoggedIn())&&!isset($result['error']))
{
	$result=$userObj->editEducation($result['id'],$_POST);
}

echo json_encode($result);
?>