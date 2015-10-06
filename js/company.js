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
yapp.controller("CompanyLoginController", ["$scope", "$location", "$http", function($scope, $location, $http) {

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
	       		$location.path("company/profile");
	       	}
	    });
	}
}]);

yapp.controller("CompanyProfileController", ["$scope", "$location", "$http", function($scope, $location, $http) {

	$('#profile_tab').click(function(){
		$(".tab-pane").removeClass("active in");
		$("#profile").addClass("active in");
	}); // Select first tab
	$('#education_tab').click(function(){
		$(".tab-pane").removeClass("active in");
		$("#education").addClass("active in");
	});
	$('#proffessional_tab').click(function(){
		$(".tab-pane").removeClass("active in");
		$("#proffessional").addClass("active in");
	});

	//signup initialize
	$scope.credential={"email":"","password":""};
	$scope.error={"email":false,"password":false};

	$scope.update=function(){
		$scope.serverError=false;
		$http({
	        method: "POST",
	        url: HOST + API_PATH + "/company/update.php",
	        data:$.param($scope.profile),
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	    	console.log(success.data);
	        if(success.data.error)
	        {
	            $scope.serverError=success.data.error;
	       	}
	    });
	}
	$scope.getProfile=function(){
		$http({
	        method: "POST",
	        url: HOST + API_PATH + "/company/profile.php",
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	        if(success.data.error)
	        {
	            $scope.serverError=success.data.error;
	            $location.path("company/login");
	       	}
	       	else
	       	{
	       		$scope.profile=success.data;
	       		$scope.education=$scope.profile.education;
	       	}

	    });
	}

	$scope.getProfile();
	
    $scope.errorEducation={"institution":false,"qualification":false,"period_start":false,"period_end":false};
    $scope.parent = {checkOut:''};
    $scope.addEdu=function(){
    	var errorFlag=false;
    	$scope.addEducation.period_start=angular.element("input[name=period_start]").val();
    	$scope.addEducation.period_end=angular.element("input[name=period_end]").val();
    	for(i in $scope.addEducation)
    	{
    		$scope.errorEducation[i]=false;
    		if(($scope.addEducation[i]==undefined)||($scope.addEducation[i]==""))
    		{
    			errorFlag=true;
    			$scope.errorEducation[i]=true;
    		}
    	}
    	console.log($scope.addEducation);
    	if(errorFlag)
    	{
    		return false;
    	}

    	$http({
	        method: "POST",
	        url: HOST + API_PATH + "/company/inserteducation.php",
	        data:$.param($scope.addEducation),
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	         $scope.getProfile();
	         $("#createEducation").modal("hide");
	    });
    }

    $('.datepicker').datepicker();
}]);