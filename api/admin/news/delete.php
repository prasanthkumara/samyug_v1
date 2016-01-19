<?php
require_once("../../helper.php");
require_once("../../classes/News.class.php");

$helper=new Helper();
$newsObj=new News();
$result=$newsObj->deleteNews($_POST);
echo json_encode($result);
?>