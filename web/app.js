'use strict';

// Declare app level module which depends on views, and components
var edubeaverApp = angular.module('edubeaver', [
	'ngRoute',
  'edubeaverHome'
]);

edubeaverApp.config(function($routeProvider) {
  $routeProvider.
  	when('/', {
  		controller: 'HomeController as home',
  		templateUrl: 'home.html'
  	}).
    when('/courses/:courseAbbr', {
      controller: 'ClassDetailController as classDetail',
      templateUrl: 'classDetail.html'
    });
});