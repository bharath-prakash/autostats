(function () {
  'use strict';

  describe('Vehiclegps Route Tests', function () {
    // Initialize global variables
    var $scope,
      VehiclegpsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _VehiclegpsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      VehiclegpsService = _VehiclegpsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('vehiclegps');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/vehiclegps');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          VehiclegpsController,
          mockVehiclegp;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('vehiclegps.view');
          $templateCache.put('modules/vehiclegps/client/views/view-vehiclegp.client.view.html', '');

          // create mock Vehiclegp
          mockVehiclegp = new VehiclegpsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Vehiclegp Name'
          });

          // Initialize Controller
          VehiclegpsController = $controller('VehiclegpsController as vm', {
            $scope: $scope,
            vehiclegpResolve: mockVehiclegp
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:vehiclegpId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.vehiclegpResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            vehiclegpId: 1
          })).toEqual('/vehiclegps/1');
        }));

        it('should attach an Vehiclegp to the controller scope', function () {
          expect($scope.vm.vehiclegp._id).toBe(mockVehiclegp._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/vehiclegps/client/views/view-vehiclegp.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          VehiclegpsController,
          mockVehiclegp;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('vehiclegps.create');
          $templateCache.put('modules/vehiclegps/client/views/form-vehiclegp.client.view.html', '');

          // create mock Vehiclegp
          mockVehiclegp = new VehiclegpsService();

          // Initialize Controller
          VehiclegpsController = $controller('VehiclegpsController as vm', {
            $scope: $scope,
            vehiclegpResolve: mockVehiclegp
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.vehiclegpResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/vehiclegps/create');
        }));

        it('should attach an Vehiclegp to the controller scope', function () {
          expect($scope.vm.vehiclegp._id).toBe(mockVehiclegp._id);
          expect($scope.vm.vehiclegp._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/vehiclegps/client/views/form-vehiclegp.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          VehiclegpsController,
          mockVehiclegp;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('vehiclegps.edit');
          $templateCache.put('modules/vehiclegps/client/views/form-vehiclegp.client.view.html', '');

          // create mock Vehiclegp
          mockVehiclegp = new VehiclegpsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Vehiclegp Name'
          });

          // Initialize Controller
          VehiclegpsController = $controller('VehiclegpsController as vm', {
            $scope: $scope,
            vehiclegpResolve: mockVehiclegp
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:vehiclegpId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.vehiclegpResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            vehiclegpId: 1
          })).toEqual('/vehiclegps/1/edit');
        }));

        it('should attach an Vehiclegp to the controller scope', function () {
          expect($scope.vm.vehiclegp._id).toBe(mockVehiclegp._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/vehiclegps/client/views/form-vehiclegp.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
