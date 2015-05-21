'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$resource', function($scope, $resource) {

  // var courses = $resource('http://192.168.59.103:3000/courses');
  // courses.get();
  $scope.courses = $resource('http://192.168.59.103:3000/courses');
  $scope.courses.get();

}]);