var yapp = angular.module("samyug", ["ngRoute",'ngCookies']);
yapp.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/dashboard.html'
    }).when('/login', {
        templateUrl: 'views/login.html'
    }).when('/:page', {
        templateUrl: function($routeParams){
        	return 'views/'+$routeParams.page+'.html'
        },
        controller:'pageController'
    }).when('/:page/:child', {
        templateUrl: function($routeParams){
        	return 'views/'+$routeParams.page+'/'+$routeParams.child+'.html'
        },
        controller:'pageController'
    }).when('/:page/:subfolder/:subpage/:id', {
        templateUrl: function($routeParams){
            return 'views/'+$routeParams.page+'/'+$routeParams.subfolder+'/'+$routeParams.subpage+'.html'
        },
        controller:'pageController'
    });
}]);

yapp.directive('datepicker', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
        element.datepicker();
    }
  };
}]);
yapp.directive('userNav',function(){
    return {
        templateUrl: '/includes/usernav.html',
    }
})

yapp.controller("pageController", ["$scope", "$location", "$http", function($scope, $location, $http) {
    toggleNav(false);
}]);
jQuery(document).ready(function($){
   
    //select a new section
/*    $('.cd-nav li').on('click', function(event){
        event.preventDefault();
        var target = $(this),
            //detect which section user has chosen
            sectionTarget = target.data('menu');
        if( !target.hasClass('cd-selected') ) {
            //if user has selected a section different from the one alredy visible
            //update the navigation -> assign the .cd-selected class to the selected item
            target.addClass('cd-selected').siblings('.cd-selected').removeClass('cd-selected');
            //load the new section
            loadNewContent(sectionTarget);
        } else {
            // otherwise close navigation
            toggleNav(false);
        }
    });*/

    function loadNewContent(newSection) {
        //create a new section element and insert it into the DOM
        var section = $('<section class="cd-section '+newSection+'"></section>').appendTo($('main'));
        //load the new content from the proper html file
        section.load(newSection+'.html .cd-section > *', function(event){
            //add the .cd-selected to the new section element -> it will cover the old one
            section.addClass('cd-selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                //close navigation
                toggleNav(false);
            });
            section.prev('.cd-selected').removeClass('cd-selected');
        });

        $('main').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            //once the navigation is closed, remove the old section from the DOM
            section.prev('.cd-section').remove();
        });

        if( $('.no-csstransitions').length > 0 ) {
            //if browser doesn't support transitions - don't wait but close navigation and remove old item
            toggleNav(false);
            section.prev('.cd-section').remove();
        }
    }

    //open navigation clicking the menu icon
    $('.cd-nav-trigger').on('click', function(event){
        event.preventDefault();
        toggleNav(true);
    });
    //close the navigation
    $('.cd-close-nav, .cd-overlay').on('click', function(event){
        event.preventDefault();
        toggleNav(false);
    });

    toggleNav=function (bool) {
        $('.cd-nav-container, .cd-overlay').toggleClass('is-visible', bool);
        $('main').toggleClass('scale-down', bool);
    }
});