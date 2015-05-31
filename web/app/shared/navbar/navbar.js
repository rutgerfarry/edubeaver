'use strict';

angular.module('myApp.navbar', [])

.controller('navbarCtrl', ['$scope', '$location',
  function($scope, $location) {
  	$scope.search = function () {
    $location.path('/search');
    $location.search('q', $scope.searchTerm);
  };
}])

.directive('rfNavbar', function() {
  return {
    templateUrl: 'shared/navbar/navbar.html'
  };
});