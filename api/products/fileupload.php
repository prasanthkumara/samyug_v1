<?php
ini_set('display_errors', '1');
error_reporting(E_ALL);

move_uploaded_file($_FILES['files']['tmp_name'][0], '/var/www/html/samyug_v1/image_upload/'.$_FILES['files']['name'][0]);

print json_encode(array("filename"=>$_FILES['files']['name'][0]));
?>