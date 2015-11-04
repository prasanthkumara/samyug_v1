var HOST=window.location.origin;
console.log(HOST);
switch(HOST)
{
	case "http://furniture.samyug.localhost":
	SITE_CATEGORY='FURNITURE';
	break;
	case "http://green.samyug.localhost":
	SITE_CATEGORY='GREEN';
	break;
	case "http://cars.samyug.localhost":
	SITE_CATEGORY='CARS';
	break;
	case "http://machine.samyug.localhost":
	SITE_CATEGORY='MACHINERY';
	break;
}
var API_PATH="/api";