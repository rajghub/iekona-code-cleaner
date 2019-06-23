var app = angular.module('cleanupApp');
app.controller('websitePage_controller',['$scope','urlFactory','$rootScope', function($scope,urlFactory,$rootScope) {
	$scope.websiteContent = false;
	$scope.webURL = "http://atopia-dev.indegene.com/";
	
	 $scope.webistefun = function() {
		$rootScope.preload = true;
		urlFactory.getData('/website/websiteURLData', {url: $scope.webURL}, 'POST').then(function(response) {
			$rootScope.preload = false;
			$scope.websiteContent = true;
			console.log(response.data)
			$scope.internalpage = response.data.data.internalPages;
			$scope.externalpage = response.data.data.externalpages;
			$scope.jsfilepage = response.data.data.allJSfile;	
			$scope.cleanedCSS = response.data.css.finalcss;			
			$scope.cleanedDOCCSS = response.data.docCSS.finalDoccss;	
        })
	 }


}]);


