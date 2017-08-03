// Vehicletypes service used to communicate Vehicletypes REST endpoints
(function () {
  'use strict';

  angular
    .module('vehicletypes')
    .factory('VehicletypesService', VehicletypesService);

  VehicletypesService.$inject = ['$resource'];

  function VehicletypesService($resource) {
    return $resource('api/vehicletypes/:vehicletypeId', {
      vehicletypeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
