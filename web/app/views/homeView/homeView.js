'use strict';

angular.module('myApp.homeView', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/homeView/homeView.html',
    controller: 'homeViewCtrl'
  });
}])

.controller('homeViewCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location) {
  var courses = $resource('http://192.168.59.103:3000/courses');
  $scope.courses = courses.query();

  $scope.search = function () {
    $location.path('/search');
    $location.search('q', $scope.searchTerm);
  };
}]);