yapp.controller("HomeController", ["$scope", "$location", "$http", function($scope, $location, $http) {
	var data={"category":SITE_CATEGORY};
	$scope.SITE_CATEGORY=SITE_CATEGORY;
	//get news related to domain
	$http({
	    method: "POST",
	    url: HOST + API_PATH + "/products/listcategories.php",
	    data:$.param(data),
	    headers: {
	        "Content-Type": "application/x-www-form-urlencoded"
	    },
	}).then(function(success) {
	    if(success.data.error)
	    {
	        $scope.newslist=[];
	    }
	    else
	    {
	    	$scope.newslist=success.data;
	    }
	});

	
}]);