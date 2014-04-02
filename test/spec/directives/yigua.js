'use strict';

describe('Directive: yiGua', function () {

  // load the directive's module
  beforeEach(module('yijingAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<yi-gua></yi-gua>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the yiGua directive');
  }));
});
