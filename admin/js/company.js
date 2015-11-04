yapp.controller("CompanyController", ["$scope", "$location", "$http", function($scope, $location, $http) {
    $http({
        method: "POST",
        url: HOST + API_PATH + "/company/list.php",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    }).then(function(success) {
        if(!success.data.error)
        {
            $scope.users=success.data;
        }
    });


}]);
yapp.controller("CompanySignupController", ["$scope", "$location", "$http", function($scope, $location, $http) {

	//signup initialize
	$scope.credential={"email":"","password":"","address":"","name":"","description":"","sub_title":"","business_id":""};
	$scope.error={"email":false,"password":false,"address":false,"name":false,"description":false,"sub_title":false,"business_id":false};

	$scope.signUp=function(){
		$scope.error={"email":false,"password":false,"address":false,"name":false,"description":false,"sub_title":false,"business_id":false};
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
		$scope.serverError=false
		$http({
	        method: "POST",
	        url: HOST + API_PATH + "/company/signup.php",
	        data:$.param($scope.credential),
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	        if(success.data.error)
	        {
	            $scope.serverError=success.data.error;
	       	}
	       	else if(success)
	       	{
	       		$location.path("company/profile");
	       	}
	    });
	}
}]);
yapp.controller("CompanyLoginController", ["$scope", "$location", "$http","$cookies", function($scope, $location, $http,$cookies) {

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
		$scope.serverError=false;
		$http({
	        method: "POST",
	        url: HOST + API_PATH + "/company/login.php",
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
	       		$cookies.put('company_user_id',success.data.id);
	       		$cookies.put('company_id',success.data.company_id);
	       		setTimeout(function(){
	       			$location.path("company/profile");
	       		},200);
	       		
	       	}
	    });
	}
}]);

