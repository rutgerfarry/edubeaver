'use strict';

angular.module('myApp.loginView', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/loginView/loginView.html',
    controller: 'loginViewCtrl'
  });
}])

.controller('loginViewCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location) {
  var courses = $resource('http://192.168.59.103:3000/courses');
  $scope.courses = courses.query();

  $scope.search = function () {
    $location.path('/search');
    $location.search('q', $scope.searchTerm);
  };
}]);