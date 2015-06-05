'use strict';

angular.module('myApp.profileView', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'views/profileView/profileView.html',
    controller: 'profileViewCtrl',
    resolve: {
      loggedin: checkLoggedIn
    }
  });
}])

.controller('profileViewCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location) {

}]);