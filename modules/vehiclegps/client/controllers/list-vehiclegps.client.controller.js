(function () {
  'use strict';

  angular
    .module('vehiclegps')
    .controller('VehiclegpsListController', VehiclegpsListController);

  VehiclegpsListController.$inject = ['VehiclegpsService'];

  function VehiclegpsListController(VehiclegpsService) {
    var vm = this;

    vm.vehiclegps = VehiclegpsService.query();
  }
}());
