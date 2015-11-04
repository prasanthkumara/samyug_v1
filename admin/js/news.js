yapp.controller("NewsController", ["$scope", "$location", "$http", function($scope, $location, $http) {
	var data={"category":SITE_CATEGORY};
	$scope.SITE_CATEGORY=SITE_CATEGORY;
	$scope.newslist=[];
	//get news related to domain
	$http({
	    method: "POST",
	    url: HOST + API_PATH + "admin/news.php",
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



	var json={
		"name":"test1",
		"children":[{
			"name":"test2",
			"children":[{
				"name":"test3",
				"children":[{
						"name":"test4",
						"children":[]
					},{
					"name":"test5",
					"children":[{
						"name":"test6",
						"children":[]
					},{
						"name":"test7",
						"children":[{

						}]
					}]
				}]
			},{
				"name":"test8",
				"children":[{
						"name":"test9",
						"children":[]
					},{
					"name":"test10",
					"children":[{
						"name":"test11",
						"children":[]
					},{
						"name":"test12",
						"children":[]
					}]
				}]
			}]
	}]};
	patha=[];
	function traverse(data,name,path)
	{
		result=null;
		if(data instanceof Array)
		{
			for(i in data)
			{
				result=traverse(data[i],name,i);
			}
		}
		else
		{
			for(prop in data)
			{
				if((prop=="name")&&(data[prop]==name))
				{
					if(path)
						patha.push(path);
					return data;
				}
				if(data[prop] instanceof Array)
				{
					result=traverse(data[prop],name,prop);
				}
			}
		}

		if(result&&(path!=""))
		{
			patha.push(path);
		}

		return result;
	}
	change=["test8","test1"];
	for(j in change)
	{
		patha=[];
		console.log(traverse(json,change[j],""));
		patha.reverse();
		console.log(patha);
		console.log(json);
		temp=json;


		for(i in patha)
		{
			temp=temp[patha[i]];
		}

		temp['name']=change[j]+"fjNWFNWfuiEWNFWNefkjesefk";
		console.log(temp);
		delete temp;
	}
	
}]);