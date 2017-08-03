(function () {
  'use strict';

  // Vehicletypes controller
  angular
    .module('vehicletypes')
    .controller('VehicletypesController', VehicletypesController);

  VehicletypesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'vehicletypeResolve'];

  function VehicletypesController ($scope, $state, $window, Authentication, vehicletype) {
    var vm = this;

    vm.authentication = Authentication;
    vm.vehicletype = vehicletype;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Vehicletype
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.vehicletype.$remove($state.go('vehicletypes.list'));
      }
    }

    // Save Vehicletype
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.vehicletypeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.vehicletype._id) {
        vm.vehicletype.$update(successCallback, errorCallback);
      } else {
        vm.vehicletype.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('vehicletypes.view', {
          vehicletypeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
