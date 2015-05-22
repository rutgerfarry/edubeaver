'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.home',
  'myApp.courseView',
  'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])
.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
    console.log('Current route name: ' + $location.path());
    // Get all URL parameter
    console.log($routeParams);
  });
}]);
