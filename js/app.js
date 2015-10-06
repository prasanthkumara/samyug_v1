var yapp = angular.module("samyug", ["ngRoute"]);
yapp.config(['$routeProvider',function($routeProvider) {
	console.log($routeProvider);
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html'
    }).when('/:page', {
        templateUrl: function($routeParams){
        	return 'views/'+$routeParams.page+'.html'
        }
    }).when('/:page/:child', {
        templateUrl: function($routeParams){
        	return 'views/'+$routeParams.page+'/'+$routeParams.child+'.html'
        }
    });
}]);

