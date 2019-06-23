var app = angular.module('cleanupApp');


//http factory for session
app.factory('urlFactory', ['$http', '$q', function($http, $q) {


    // interface
    var service = {
        getData: getData
    };

    return service;

    function getData(route_url, data, type) {
        var def = $q.defer();

        $http({
            method: type,
            url: route_url,
            cache: false,
            headers: { 'Cache-Control': 'no-cache' },
            data: data
        }).then(function successCallback(response) {
            def.resolve(response);
        }, function errorCallback(response) {
            def.reject("Failed....");
        });

        return def.promise;

    }

}]);

