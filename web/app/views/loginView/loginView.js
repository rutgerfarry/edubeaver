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

  $scope.verified = {};
  $scope.verified.email = false;
  $scope.verified.password = false;
  $scope.userEmail = '';
  $scope.userPassword = '';

  var emailRegex = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm;
  $scope.$watch('userEmail', function () {
    var email = String($scope.userEmail);
    $scope.verified.email = email.match(emailRegex) ? true : false;
  });
  $scope.$watch('userPassword', function () {
    var password = String($scope.userPassword);
    $scope.verified.password = password.length > 5 ? true : false;
  });

  $scope.loginOrSignup = function() {
    if ($scope.verified.email && $scope.verified.password) {

      var User = $resource('http://192.168.59.103:3000/users',
        { email: $scope.userEmail, password: $scope.userPassword }, 
        { create: { method: 'POST' }
      });
      var user = User.save({ email: $scope.userEmail, password: $scope.userPassword });
    }
  };
}]);
