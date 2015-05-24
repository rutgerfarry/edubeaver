'use strict';

angular.module('myApp.searchView', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search/:query', {
    templateUrl: 'views/searchView/searchView.html',
    controller: 'searchViewCtrl'
  });
}])

.controller('searchViewCtrl', ['$scope', '$resource', function($scope, $resource) {
  var courses = $resource('http://192.168.59.103:3000/courses');
  $scope.courses = courses.query();
}]);