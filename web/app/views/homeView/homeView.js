'use strict';

angular.module('myApp.homeView', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/homeView/homeView.html',
    controller: 'homeViewCtrl'
  });
}])

.controller('homeViewCtrl', ['$scope', '$resource', function($scope, $resource) {
  var courses = $resource('http://192.168.59.103:3000/courses');
  $scope.courses = courses.query();
}]);