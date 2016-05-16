'use strict';

/* App Module */

var potatoApp = angular.module('potatoApp', [
  'ngRoute',
  'potatoControllers'
]);

potatoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/potato', {
        templateUrl: 'partials/potato-list.html',
        controller: 'PotatoListCtrl'
      }).
      when('/potato/:potatoId', {
        templateUrl: 'partials/potato-detail.html',
        controller: 'PotatoDetailCtrl'
      }).
      otherwise({
        redirectTo: '/potato'
      });
  }]);
