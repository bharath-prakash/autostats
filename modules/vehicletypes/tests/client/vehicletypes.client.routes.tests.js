(function () {
  'use strict';

  describe('Vehicletypes Route Tests', function () {
    // Initialize global variables
    var $scope,
      VehicletypesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _VehicletypesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      VehicletypesService = _VehicletypesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('vehicletypes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/vehicletypes');
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
          VehicletypesController,
          mockVehicletype;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('vehicletypes.view');
          $templateCache.put('modules/vehicletypes/client/views/view-vehicletype.client.view.html', '');

          // create mock Vehicletype
          mockVehicletype = new VehicletypesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Vehicletype Name'
          });

          // Initialize Controller
          VehicletypesController = $controller('VehicletypesController as vm', {
            $scope: $scope,
            vehicletypeResolve: mockVehicletype
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:vehicletypeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.vehicletypeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            vehicletypeId: 1
          })).toEqual('/vehicletypes/1');
        }));

        it('should attach an Vehicletype to the controller scope', function () {
          expect($scope.vm.vehicletype._id).toBe(mockVehicletype._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/vehicletypes/client/views/view-vehicletype.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          VehicletypesController,
          mockVehicletype;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('vehicletypes.create');
          $templateCache.put('modules/vehicletypes/client/views/form-vehicletype.client.view.html', '');

          // create mock Vehicletype
          mockVehicletype = new VehicletypesService();

          // Initialize Controller
          VehicletypesController = $controller('VehicletypesController as vm', {
            $scope: $scope,
            vehicletypeResolve: mockVehicletype
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.vehicletypeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/vehicletypes/create');
        }));

        it('should attach an Vehicletype to the controller scope', function () {
          expect($scope.vm.vehicletype._id).toBe(mockVehicletype._id);
          expect($scope.vm.vehicletype._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/vehicletypes/client/views/form-vehicletype.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          VehicletypesController,
          mockVehicletype;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('vehicletypes.edit');
          $templateCache.put('modules/vehicletypes/client/views/form-vehicletype.client.view.html', '');

          // create mock Vehicletype
          mockVehicletype = new VehicletypesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Vehicletype Name'
          });

          // Initialize Controller
          VehicletypesController = $controller('VehicletypesController as vm', {
            $scope: $scope,
            vehicletypeResolve: mockVehicletype
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:vehicletypeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.vehicletypeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            vehicletypeId: 1
          })).toEqual('/vehicletypes/1/edit');
        }));

        it('should attach an Vehicletype to the controller scope', function () {
          expect($scope.vm.vehicletype._id).toBe(mockVehicletype._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/vehicletypes/client/views/form-vehicletype.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
