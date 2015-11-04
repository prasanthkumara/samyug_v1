yapp.controller("ProfileController", ["$scope", "$location", "$http", function($scope, $location, $http) {

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
	$('#plans_tab').click(function(){
		$(".tab-pane").removeClass("active in");
		$("#plans").addClass("active in");
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

    $scope.editPopup=function(index){
    	$scope.editEducation=$scope.education[index];
    }

    $scope.editEdu=function(){
    	var errorFlag=false;
    	$scope.editEducation.period_start=angular.element("#editEducation input[name=period_start]").val();
    	$scope.editEducation.period_end=angular.element("#editEducation input[name=period_end]").val();
    	for(i in $scope.editEducation)
    	{
    		$scope.errorEducation[i]=false;
    		if(($scope.editEducation[i]==undefined)||($scope.editEducation[i]==""))
    		{
    			errorFlag=true;
    			$scope.errorEducation[i]=true;
    		}
    	}
    	
    	if(errorFlag)
    	{
    		return false;
    	}

    	$http({
	        method: "POST",
	        url: HOST + API_PATH + "/company/editeducation.php",
	        data:$.param($scope.editEducation),
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	         //$scope.getProfile();
	         $("#editEducation").modal("hide");
	    });
    }
}]);