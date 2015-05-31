'use strict';

angular.module('myApp.searchView', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search/:query', {
    templateUrl: 'views/searchView/searchView.html',
    controller: 'searchViewCtrl'
  });
  $routeProvider.when('/search', {
    templateUrl: 'views/searchView/searchView.html',
    controller: 'searchViewCtrl'
  });
}])

.controller('searchViewCtrl', ['$scope', '$resource', '$routeParams',
  function($scope, $resource, $routeParams) {

  var searchResults = $resource('http://192.168.59.103:3000/search/courses/:q',
    { q: $routeParams.q });
  $scope.searchResults = searchResults.query();
}]);