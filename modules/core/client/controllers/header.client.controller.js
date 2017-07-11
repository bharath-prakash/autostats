'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus',
  function ($scope, $state, Authentication, Menus) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    $scope.notifications = [{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'red',
                               'text':'Vehicle XCY has gone off the marked perimeter.',
                               'date':'04 Jul 2017 14:20'

                            },{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'green',
                               'text':'Vehicle XCY has reached drop off point.',
                               'date':'04 Jul 2017 11:20'

                            },{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'green',
                               'text':'Vehicle XCY has reached drop off point.',
                               'date':'04 Jul 2017 11:20'

                            },{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'green',
                               'text':'Vehicle XCY has reached drop off point.',
                               'date':'04 Jul 2017 11:20'

                            },{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'green',
                               'text':'Vehicle XCY has reached drop off point.',
                               'date':'04 Jul 2017 11:20'

                            },{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'green',
                               'text':'Vehicle XCY has reached drop off point.',
                               'date':'04 Jul 2017 11:20'

                            },{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'green',
                               'text':'Vehicle XCY has reached drop off point.',
                               'date':'04 Jul 2017 11:20'

                            },{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'green',
                               'text':'Vehicle XCY has reached drop off point.',
                               'date':'04 Jul 2017 11:20'

                            },{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'green',
                               'text':'Vehicle XCY has reached drop off point.',
                               'date':'04 Jul 2017 11:20'

                            },{ 'id':'NTF12312312',
                               'type': 'Alert',
                               'color':'green',
                               'text':'Vehicle XCY has reached drop off point.',
                               'date':'04 Jul 2017 11:20'

                            },];

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);
