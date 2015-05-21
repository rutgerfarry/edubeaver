'use strict';

angular.module('myApp.home', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home_view/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope', '$resource', function($scope, $resource) {
  var courses = $resource('http://192.168.59.103:3000/courses');
  $scope.courses = courses.query();
}]);