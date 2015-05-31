'use strict';

angular.module('myApp.courseView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/course/:abbr', {
    templateUrl: 'views/courseView/courseView.html',
    controller: 'courseViewCtrl'
  });
}])

.controller('courseViewCtrl', ['$scope', 
                               '$resource', 
                               '$routeParams',
                               function($scope, $resource, $routeParams) 
{
  var course = $resource('http://192.168.59.103:3000/courses/:abbr',
    { abbr: $routeParams.abbr });
  $scope.course = course.get();
}]);
