'use strict';

describe('Vehiclegps E2E Tests:', function () {
  describe('Test Vehiclegps page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/vehiclegps');
      expect(element.all(by.repeater('vehiclegp in vehiclegps')).count()).toEqual(0);
    });
  });
});
