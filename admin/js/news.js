yapp.controller("NewsController", ["$scope", "$location", "$http", function($scope, $location, $http) {
	var data={"category":SITE_CATEGORY};
	$scope.SITE_CATEGORY=SITE_CATEGORY;
	$scope.newslist=[];
	$scope.list=function(){
		//get news related to domain
		$http({
		    method: "POST",
		    url: HOST + API_PATH + "/admin/news/list.php",
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
	}
	
	$scope.list();

	$scope.addNewsModel={"title":"","description":"","category":""};
	$scope.errornews={"title":false,"description":false,"category":false};

	$scope.addNews=function(){
		var errorFlag=false;
		$scope.errornews={"title":false,"description":false,"category":false};
		if($scope.addNewsModel.title=="")
		{
			$scope.errornews.title=true;
			errorFlag=true;
		}

		if($scope.addNewsModel.description=="")
		{
			$scope.errornews.description=true;
			errorFlag=true;
		}

		if($scope.addNewsModel.category=="")
		{
			$scope.errornews.category=true;
			errorFlag=true;
		}

		if(errorFlag)
		{
			return false;
		}

		$http({
		    method: "POST",
		    url: HOST + API_PATH + "/admin/news/add.php",
		    data:$.param($scope.addNewsModel),
		    headers: {
		        "Content-Type": "application/x-www-form-urlencoded"
		    },
		}).then(function(success) {
		    if(success)
		    {
		    	$scope.list();
		    	$("#createNews").modal("hide");
		    }
		    else
		    {
		    	$scope.errorMessage=success.error;
		    }
		});
	}

	$scope.delete=function(id){
		$http({
		    method: "POST",
		    url: HOST + API_PATH + "/admin/news/delete.php",
		    data:$.param({"news_id":id}),
		    headers: {
		        "Content-Type": "application/x-www-form-urlencoded"
		    },
		}).then(function(success) {
		    if(success)
		    {
		    	$scope.list();
		    }
		    else
		    {
		    	$scope.errorMessage=success.error;
		    }
		});
	}
	
}]);