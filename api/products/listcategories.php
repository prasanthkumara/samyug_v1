<?php
require_once("../helper.php");
require_once("../classes/Products.class.php");

$helper=new Helper();
$productObj=new Products();

$result=$productObj->listCategories();

echo json_encode($result);
?>