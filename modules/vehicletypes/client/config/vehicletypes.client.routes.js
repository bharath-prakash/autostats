(function () {
  'use strict';

  angular
    .module('vehicletypes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('vehicletypes', {
        abstract: true,
        url: '/vehicletypes',
        template: '<ui-view/>'
      })
      .state('vehicletypes.list', {
        url: '',
        templateUrl: 'modules/vehicletypes/client/views/list-vehicletypes.client.view.html',
        controller: 'VehicletypesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Vehicletypes List'
        }
      })
      .state('vehicletypes.create', {
        url: '/create',
        templateUrl: 'modules/vehicletypes/client/views/form-vehicletype.client.view.html',
        controller: 'VehicletypesController',
        controllerAs: 'vm',
        resolve: {
          vehicletypeResolve: newVehicletype
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Vehicletypes Create'
        }
      })
      .state('vehicletypes.edit', {
        url: '/:vehicletypeId/edit',
        templateUrl: 'modules/vehicletypes/client/views/form-vehicletype.client.view.html',
        controller: 'VehicletypesController',
        controllerAs: 'vm',
        resolve: {
          vehicletypeResolve: getVehicletype
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Vehicletype {{ vehicletypeResolve.name }}'
        }
      })
      .state('vehicletypes.view', {
        url: '/:vehicletypeId',
        templateUrl: 'modules/vehicletypes/client/views/view-vehicletype.client.view.html',
        controller: 'VehicletypesController',
        controllerAs: 'vm',
        resolve: {
          vehicletypeResolve: getVehicletype
        },
        data: {
          pageTitle: 'Vehicletype {{ vehicletypeResolve.name }}'
        }
      });
  }

  getVehicletype.$inject = ['$stateParams', 'VehicletypesService'];

  function getVehicletype($stateParams, VehicletypesService) {
    return VehicletypesService.get({
      vehicletypeId: $stateParams.vehicletypeId
    }).$promise;
  }

  newVehicletype.$inject = ['VehicletypesService'];

  function newVehicletype(VehicletypesService) {
    return new VehicletypesService();
  }
}());
