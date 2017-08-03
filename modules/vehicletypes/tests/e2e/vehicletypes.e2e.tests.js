'use strict';

describe('Vehicletypes E2E Tests:', function () {
  describe('Test Vehicletypes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/vehicletypes');
      expect(element.all(by.repeater('vehicletype in vehicletypes')).count()).toEqual(0);
    });
  });
});
