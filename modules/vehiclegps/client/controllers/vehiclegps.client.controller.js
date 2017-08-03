(function () {
  'use strict';

  // Vehiclegps controller
  angular
    .module('vehiclegps')
    .controller('VehiclegpsController', VehiclegpsController);

  VehiclegpsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'vehiclegpResolve'];

  function VehiclegpsController ($scope, $state, $window, Authentication, vehiclegp) {
    var vm = this;

    vm.authentication = Authentication;
    vm.vehiclegp = vehiclegp;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Vehiclegp
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.vehiclegp.$remove($state.go('vehiclegps.list'));
      }
    }

    // Save Vehiclegp
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.vehiclegpForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.vehiclegp._id) {
        vm.vehiclegp.$update(successCallback, errorCallback);
      } else {
        vm.vehiclegp.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('vehiclegps.view', {
          vehiclegpId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
