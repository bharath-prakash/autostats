'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Vehicletype = mongoose.model('Vehicletype'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  vehicletype;

/**
 * Vehicletype routes tests
 */
describe('Vehicletype CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Vehicletype
    user.save(function () {
      vehicletype = {
        name: 'Vehicletype name'
      };

      done();
    });
  });

  it('should be able to save a Vehicletype if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Vehicletype
        agent.post('/api/vehicletypes')
          .send(vehicletype)
          .expect(200)
          .end(function (vehicletypeSaveErr, vehicletypeSaveRes) {
            // Handle Vehicletype save error
            if (vehicletypeSaveErr) {
              return done(vehicletypeSaveErr);
            }

            // Get a list of Vehicletypes
            agent.get('/api/vehicletypes')
              .end(function (vehicletypesGetErr, vehicletypesGetRes) {
                // Handle Vehicletypes save error
                if (vehicletypesGetErr) {
                  return done(vehicletypesGetErr);
                }

                // Get Vehicletypes list
                var vehicletypes = vehicletypesGetRes.body;

                // Set assertions
                (vehicletypes[0].user._id).should.equal(userId);
                (vehicletypes[0].name).should.match('Vehicletype name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Vehicletype if not logged in', function (done) {
    agent.post('/api/vehicletypes')
      .send(vehicletype)
      .expect(403)
      .end(function (vehicletypeSaveErr, vehicletypeSaveRes) {
        // Call the assertion callback
        done(vehicletypeSaveErr);
      });
  });

  it('should not be able to save an Vehicletype if no name is provided', function (done) {
    // Invalidate name field
    vehicletype.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Vehicletype
        agent.post('/api/vehicletypes')
          .send(vehicletype)
          .expect(400)
          .end(function (vehicletypeSaveErr, vehicletypeSaveRes) {
            // Set message assertion
            (vehicletypeSaveRes.body.message).should.match('Please fill Vehicletype name');

            // Handle Vehicletype save error
            done(vehicletypeSaveErr);
          });
      });
  });

  it('should be able to update an Vehicletype if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Vehicletype
        agent.post('/api/vehicletypes')
          .send(vehicletype)
          .expect(200)
          .end(function (vehicletypeSaveErr, vehicletypeSaveRes) {
            // Handle Vehicletype save error
            if (vehicletypeSaveErr) {
              return done(vehicletypeSaveErr);
            }

            // Update Vehicletype name
            vehicletype.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Vehicletype
            agent.put('/api/vehicletypes/' + vehicletypeSaveRes.body._id)
              .send(vehicletype)
              .expect(200)
              .end(function (vehicletypeUpdateErr, vehicletypeUpdateRes) {
                // Handle Vehicletype update error
                if (vehicletypeUpdateErr) {
                  return done(vehicletypeUpdateErr);
                }

                // Set assertions
                (vehicletypeUpdateRes.body._id).should.equal(vehicletypeSaveRes.body._id);
                (vehicletypeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Vehicletypes if not signed in', function (done) {
    // Create new Vehicletype model instance
    var vehicletypeObj = new Vehicletype(vehicletype);

    // Save the vehicletype
    vehicletypeObj.save(function () {
      // Request Vehicletypes
      request(app).get('/api/vehicletypes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Vehicletype if not signed in', function (done) {
    // Create new Vehicletype model instance
    var vehicletypeObj = new Vehicletype(vehicletype);

    // Save the Vehicletype
    vehicletypeObj.save(function () {
      request(app).get('/api/vehicletypes/' + vehicletypeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', vehicletype.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Vehicletype with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/vehicletypes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Vehicletype is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Vehicletype which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Vehicletype
    request(app).get('/api/vehicletypes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Vehicletype with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Vehicletype if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Vehicletype
        agent.post('/api/vehicletypes')
          .send(vehicletype)
          .expect(200)
          .end(function (vehicletypeSaveErr, vehicletypeSaveRes) {
            // Handle Vehicletype save error
            if (vehicletypeSaveErr) {
              return done(vehicletypeSaveErr);
            }

            // Delete an existing Vehicletype
            agent.delete('/api/vehicletypes/' + vehicletypeSaveRes.body._id)
              .send(vehicletype)
              .expect(200)
              .end(function (vehicletypeDeleteErr, vehicletypeDeleteRes) {
                // Handle vehicletype error error
                if (vehicletypeDeleteErr) {
                  return done(vehicletypeDeleteErr);
                }

                // Set assertions
                (vehicletypeDeleteRes.body._id).should.equal(vehicletypeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Vehicletype if not signed in', function (done) {
    // Set Vehicletype user
    vehicletype.user = user;

    // Create new Vehicletype model instance
    var vehicletypeObj = new Vehicletype(vehicletype);

    // Save the Vehicletype
    vehicletypeObj.save(function () {
      // Try deleting Vehicletype
      request(app).delete('/api/vehicletypes/' + vehicletypeObj._id)
        .expect(403)
        .end(function (vehicletypeDeleteErr, vehicletypeDeleteRes) {
          // Set message assertion
          (vehicletypeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Vehicletype error error
          done(vehicletypeDeleteErr);
        });

    });
  });

  it('should be able to get a single Vehicletype that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Vehicletype
          agent.post('/api/vehicletypes')
            .send(vehicletype)
            .expect(200)
            .end(function (vehicletypeSaveErr, vehicletypeSaveRes) {
              // Handle Vehicletype save error
              if (vehicletypeSaveErr) {
                return done(vehicletypeSaveErr);
              }

              // Set assertions on new Vehicletype
              (vehicletypeSaveRes.body.name).should.equal(vehicletype.name);
              should.exist(vehicletypeSaveRes.body.user);
              should.equal(vehicletypeSaveRes.body.user._id, orphanId);

              // force the Vehicletype to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Vehicletype
                    agent.get('/api/vehicletypes/' + vehicletypeSaveRes.body._id)
                      .expect(200)
                      .end(function (vehicletypeInfoErr, vehicletypeInfoRes) {
                        // Handle Vehicletype error
                        if (vehicletypeInfoErr) {
                          return done(vehicletypeInfoErr);
                        }

                        // Set assertions
                        (vehicletypeInfoRes.body._id).should.equal(vehicletypeSaveRes.body._id);
                        (vehicletypeInfoRes.body.name).should.equal(vehicletype.name);
                        should.equal(vehicletypeInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Vehicletype.remove().exec(done);
    });
  });
});
