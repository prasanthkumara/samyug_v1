yapp.controller("LoginController", ["$scope", "$location", "$http","$cookies", function($scope, $location, $http,$cookies) {

	//signup initialize
	$scope.credential={"email":"","password":""};
	$scope.error={"email":false,"password":false};

	$scope.login=function(){
		$scope.error={"email":false,"password":false};
		var flag=false;
		for(i in $scope.credential)
		{
			if($scope.credential[i]=="")
			{
				$scope.error[i]=true;
				flag=true;
			}
		}
		if(flag)
		{
			return false;
		}
		$scope.credential['role']='USER';
		$scope.serverError=false;
		$http({
	        method: "POST",
	        url: HOST + API_PATH + "/admin/login.php",
	        data:$.param($scope.credential),
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	    	console.log(success.data);
	        if(success.data.error)
	        {
	            $scope.serverError=success.data.error;
	       	}
	       	else if(success)
	       	{
	       		$cookies.put('first_name',success.data.first_name);
	       		$cookies.put('last_name',success.data.last_name);
	       		$cookies.put('user_id',success.data.id);
	       		setTimeout(function(){
	       			$location.path("users/profile");
	       		},200);
	       		
	       	}
	    });
	}
}]);