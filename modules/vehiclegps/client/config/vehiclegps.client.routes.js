(function () {
  'use strict';

  angular
    .module('vehiclegps')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('vehiclegps', {
        abstract: true,
        url: '/vehiclegps',
        template: '<ui-view/>'
      })
      .state('vehiclegps.list', {
        url: '',
        templateUrl: 'modules/vehiclegps/client/views/list-vehiclegps.client.view.html',
        controller: 'VehiclegpsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Vehiclegps List'
        }
      })
      .state('vehiclegps.create', {
        url: '/create',
        templateUrl: 'modules/vehiclegps/client/views/form-vehiclegp.client.view.html',
        controller: 'VehiclegpsController',
        controllerAs: 'vm',
        resolve: {
          vehiclegpResolve: newVehiclegp
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Vehiclegps Create'
        }
      })
      .state('vehiclegps.edit', {
        url: '/:vehiclegpId/edit',
        templateUrl: 'modules/vehiclegps/client/views/form-vehiclegp.client.view.html',
        controller: 'VehiclegpsController',
        controllerAs: 'vm',
        resolve: {
          vehiclegpResolve: getVehiclegp
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Vehiclegp {{ vehiclegpResolve.name }}'
        }
      })
      .state('vehiclegps.view', {
        url: '/:vehiclegpId',
        templateUrl: 'modules/vehiclegps/client/views/view-vehiclegp.client.view.html',
        controller: 'VehiclegpsController',
        controllerAs: 'vm',
        resolve: {
          vehiclegpResolve: getVehiclegp
        },
        data: {
          pageTitle: 'Vehiclegp {{ vehiclegpResolve.name }}'
        }
      });
  }

  getVehiclegp.$inject = ['$stateParams', 'VehiclegpsService'];

  function getVehiclegp($stateParams, VehiclegpsService) {
    return VehiclegpsService.get({
      vehiclegpId: $stateParams.vehiclegpId
    }).$promise;
  }

  newVehiclegp.$inject = ['VehiclegpsService'];

  function newVehiclegp(VehiclegpsService) {
    return new VehiclegpsService();
  }
}());
