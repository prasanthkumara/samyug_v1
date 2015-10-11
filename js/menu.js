yapp.controller("menuController", ["$scope", "$location", "$http", function($scope, $location, $http) {
	$scope.logout=function(){
		$http({
	        method: "POST",
	        url: HOST + API_PATH + "/company/logout.php",
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	    	$location.path("#/company/login");
	    });
	}
}]);