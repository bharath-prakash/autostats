'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/views/home.client.view.html'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      }).state('viewtrips', {
        url: '/trips',
        templateUrl: 'modules/core/views/trips.client.view.html'
      }).state('livetrips', {
        url: '/livetrips',
        templateUrl: 'modules/core/views/live-trips.client.view.html'
      }).state('routesettings', {
        url: '/routesettings',
        templateUrl: 'modules/core/views/routesettings.client.view.html'
      }).state('login', {
        url: '/login',
        templateUrl: 'modules/core/views/userlogin.client.view.html'
      });
  }
]);
