'use strict';

describe('Controller: TranslatorCtrl', function () {

  // load the controller's module
  beforeEach(module('moviesshowApp'));

  var TranslatorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TranslatorCtrl = $controller('TranslatorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
