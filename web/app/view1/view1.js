'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.courses = [
    { abbr: 'CS 160', title: 'INTRODUCTION TO COMPUTER SCIENCE' },
    { abbr: 'ACTG 317', title: 'EXTERNAL REPORTING I' },
    { abbr: 'MB 302', title: 'GENERAL MICROBIOLOGY' }
  ];
}]);