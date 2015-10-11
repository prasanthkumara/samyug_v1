yapp.controller("CompanyProductController", ["$scope", "$location", "$http", function($scope, $location, $http) {

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
	$scope.getProducts=function(){
		$http({
	        method: "POST",
	        url: HOST + API_PATH + "/company/productList.php",
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	        if(success.data.error)
	        {
	            $scope.serverError=success.data.error;
	            alert($scope.serverError);
	            if($scope.serverError.indexOf("Session")>-1)
	            {
	            	$location.path("#/company/login");
	            }
	       	}
	       	else
	       	{
	       		$scope.products=success.data;
	       	}

	    });
	}

	$scope.attachFileEvent=function(){
		$('#fileupload').fileupload({
	        dataType: 'json',
	        progressall: function (e, data) {
		        var progress = parseInt(data.loaded / data.total * 100, 10);
		        $('#progress .progress-bar').css(
		            'width',
		            progress + '%'
		        );
		    },
	        complete: function (result, textStatus, jqXHR) {
	        	console.log(result.responseJSON);
	        	$scope.addProductModel.image=result.responseJSON.filename;
	        	console.log($scope.addProductModel);
	        }
	    });
	}

	$scope.attachFileEvent();

	$scope.getProducts();
	
    $scope.errorProduct={"title":false,"image":false,"description":false,"price":false};
    $scope.addProductModel={"title":"","image":"","description":"","price":""};
    $scope.parent = {checkOut:''};
    $scope.addProduct=function(){
    	var errorFlag=false;
    	for(i in $scope.addProductModel)
    	{
    		$scope.errorProduct[i]=false;
    		if($scope.addProductModel[i]=="")
    		{
    			errorFlag=true;
    			$scope.errorProduct[i]=true;
    		}
    	}

    	if(errorFlag)
    	{
    		return false;
    	}

    	$http({
	        method: "POST",
	        url: HOST + API_PATH + "/company/insertproduct.php",
	        data:$.param($scope.addProductModel),
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	         $scope.getProducts();
	         $("#createProduct").modal("hide");
	    });
    }

    $scope.editPopup=function(index){
    	console.log($scope.products[index]);
    	$scope.editProductModel=$scope.products[index];
    }

    $scope.editProduct=function(){
    	var errorFlag=false;
    	for(i in $scope.editProductModel)
    	{
    		$scope.errorProduct[i]=false;
    		if(($scope.editProductModel[i]==undefined)||($scope.editProductModel[i]==""))
    		{
    			errorFlag=true;
    			$scope.errorProduct[i]=true;
    		}
    	}
    	
    	if(errorFlag)
    	{
    		return false;
    	}

    	$http({
	        method: "POST",
	        url: HOST + API_PATH + "/products/editproduct.php",
	        data:$.param($scope.editProductModel),
	        headers: {
	            "Content-Type": "application/x-www-form-urlencoded"
	        },
	    }).then(function(success) {
	         //$scope.getProfile();
	         $("#editProduct").modal("hide");
	    });
    }



}]);