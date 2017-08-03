// Vehiclegps service used to communicate Vehiclegps REST endpoints
(function () {
  'use strict';

  angular
    .module('vehiclegps')
    .factory('VehiclegpsService', VehiclegpsService);

  VehiclegpsService.$inject = ['$resource'];

  function VehiclegpsService($resource) {
    return $resource('api/vehiclegps/:vehiclegpId', {
      vehiclegpId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
