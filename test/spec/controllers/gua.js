'use strict';

describe('Controller: GuaCtrl', function () {

  // load the controller's module
  beforeEach(module('yijingAngularApp'));

  var GuaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuaCtrl = $controller('GuaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
