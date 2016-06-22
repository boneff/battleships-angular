'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.Board',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  
   $routeProvider.when('/', {
    templateUrl: 'Board/board.html',
    controller: 'BoardController'
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);
