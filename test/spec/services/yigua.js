'use strict';

describe('Service: Yigua', function () {

  // load the service's module
  beforeEach(module('yijingAngularApp'));

  // instantiate service
  var Yigua;
  beforeEach(inject(function (_Yigua_) {
    Yigua = _Yigua_;
  }));

  it('should do something', function () {
    expect(!!Yigua).toBe(true);
  });

});
