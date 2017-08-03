'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Vehiclegp = mongoose.model('Vehiclegp');

/**
 * Globals
 */
var user,
  vehiclegp;

/**
 * Unit tests
 */
describe('Vehiclegp Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      vehiclegp = new Vehiclegp({
        name: 'Vehiclegp Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return vehiclegp.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      vehiclegp.name = '';

      return vehiclegp.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Vehiclegp.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
