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
  $scope.firstName = '';
  $scope.lastName = '';
  $scope.email = '';
  $scope.password = '';
  // Determines whether to show login or sign-up view
  $scope.login = true;

  var emailRegex = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm;
  $scope.$watch('email', function () {
    var email = String($scope.email);
    $scope.verified.email = email.match(emailRegex) ? true : false;
  });
  $scope.$watch('password', function () {
    var password = String($scope.password);
    $scope.verified.password = password.length > 5 ? true : false;
  });

  $scope.signup = function() {
    if ($scope.verified.email && $scope.verified.password) {
      var User = $resource('http://192.168.59.103:3000/users/signup');
      var user = User.save({ first_name: $scope.firstName,
                             last_name: $scope.lastName,
                             email: $scope.email, 
                             password: $scope.password 
      });
    }
  };

  $scope.login = function() {
    if ($scope.verified.email && $scope.verified.password) {
      var User = $resource('http://192.168.59.103:3000/users/login');
      var user = User.save({ email: $scope.email,
                             password: $scope.password
      }, function () {
        $location.path('/');
      }, function () {
        $location.path('/login');
      });
    }
  };
}]);
