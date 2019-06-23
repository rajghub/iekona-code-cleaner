var app = angular.module('cleanupApp', ['ui.router']);
app.controller('cssCleanup',['$scope','$state','$rootScope', function($scope, $state, $rootScope) {
	$rootScope.preload = false;
	
	$scope.nav = function(url) {
			$state.go(url, { reload: true });
	}

}]);

//run method to get change state
app.run(['$rootScope', '$state', function($rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.subMenu = toState.name;
    })

}]);



app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $urlRouterProvider.otherwise('/website');


    $stateProvider

    .state('website', {
        url: '/website',
        templateUrl: 'slides/website.html',
        controller: "websitePage_controller"
    })

    .state('iDetail-eDetail', {
        url: '/iDetail-eDetail',
        templateUrl: 'slides/iDetail_eDetail.html',
        controller: "iDetaileDetail_controller"
    })
	
	.state('GetCleanCSS', {
        url: '/GetCleanCSS',
        templateUrl: 'slides/GetCleanCSS.html',
        controller: "GetCleanCSS_controller"
    })


})
