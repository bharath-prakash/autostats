(function () {
  'use strict';

  angular
    .module('vehicletypes')
    .controller('VehicletypesListController', VehicletypesListController);

  VehicletypesListController.$inject = ['VehicletypesService'];

  function VehicletypesListController(VehicletypesService) {
    var vm = this;

    vm.vehicletypes = VehicletypesService.query();
  }
}());
