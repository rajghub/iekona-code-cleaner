var app = angular.module('cleanupApp');
app.controller('GetCleanCSS_controller',['$scope','urlFactory','$rootScope', function($scope,urlFactory,$rootScope) {

	 $scope.uncssfun = function() {
		$rootScope.preload = true;
		urlFactory.getData('/uncss/getuncsscontent', {html: $scope.inputHtml, css: $scope.inputCss}, 'POST').then(function(response) {
			$rootScope.preload = false;
			$scope.outputCss = response.data.cleancss;           
        })
	 }


}]);


