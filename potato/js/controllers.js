'use strict';

/* Controllers */

var potatoControllers = angular.module('potatoControllers', []);

potatoControllers.controller('PotatoListCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('potato/flickr-data.json').success(function(data) {
        $scope.potatoes = data;
        });
    }]);

potatoControllers.controller('PotatoDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.potatoId = $routeParams.potatoId;
  }]);