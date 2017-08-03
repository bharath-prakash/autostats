'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Vehiclegp = mongoose.model('Vehiclegp'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  vehiclegp;

/**
 * Vehiclegp routes tests
 */
describe('Vehiclegp CRUD tests', function () {

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

    // Save a user to the test db and create new Vehiclegp
    user.save(function () {
      vehiclegp = {
        name: 'Vehiclegp name'
      };

      done();
    });
  });

  it('should be able to save a Vehiclegp if logged in', function (done) {
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

        // Save a new Vehiclegp
        agent.post('/api/vehiclegps')
          .send(vehiclegp)
          .expect(200)
          .end(function (vehiclegpSaveErr, vehiclegpSaveRes) {
            // Handle Vehiclegp save error
            if (vehiclegpSaveErr) {
              return done(vehiclegpSaveErr);
            }

            // Get a list of Vehiclegps
            agent.get('/api/vehiclegps')
              .end(function (vehiclegpsGetErr, vehiclegpsGetRes) {
                // Handle Vehiclegps save error
                if (vehiclegpsGetErr) {
                  return done(vehiclegpsGetErr);
                }

                // Get Vehiclegps list
                var vehiclegps = vehiclegpsGetRes.body;

                // Set assertions
                (vehiclegps[0].user._id).should.equal(userId);
                (vehiclegps[0].name).should.match('Vehiclegp name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Vehiclegp if not logged in', function (done) {
    agent.post('/api/vehiclegps')
      .send(vehiclegp)
      .expect(403)
      .end(function (vehiclegpSaveErr, vehiclegpSaveRes) {
        // Call the assertion callback
        done(vehiclegpSaveErr);
      });
  });

  it('should not be able to save an Vehiclegp if no name is provided', function (done) {
    // Invalidate name field
    vehiclegp.name = '';

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

        // Save a new Vehiclegp
        agent.post('/api/vehiclegps')
          .send(vehiclegp)
          .expect(400)
          .end(function (vehiclegpSaveErr, vehiclegpSaveRes) {
            // Set message assertion
            (vehiclegpSaveRes.body.message).should.match('Please fill Vehiclegp name');

            // Handle Vehiclegp save error
            done(vehiclegpSaveErr);
          });
      });
  });

  it('should be able to update an Vehiclegp if signed in', function (done) {
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

        // Save a new Vehiclegp
        agent.post('/api/vehiclegps')
          .send(vehiclegp)
          .expect(200)
          .end(function (vehiclegpSaveErr, vehiclegpSaveRes) {
            // Handle Vehiclegp save error
            if (vehiclegpSaveErr) {
              return done(vehiclegpSaveErr);
            }

            // Update Vehiclegp name
            vehiclegp.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Vehiclegp
            agent.put('/api/vehiclegps/' + vehiclegpSaveRes.body._id)
              .send(vehiclegp)
              .expect(200)
              .end(function (vehiclegpUpdateErr, vehiclegpUpdateRes) {
                // Handle Vehiclegp update error
                if (vehiclegpUpdateErr) {
                  return done(vehiclegpUpdateErr);
                }

                // Set assertions
                (vehiclegpUpdateRes.body._id).should.equal(vehiclegpSaveRes.body._id);
                (vehiclegpUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Vehiclegps if not signed in', function (done) {
    // Create new Vehiclegp model instance
    var vehiclegpObj = new Vehiclegp(vehiclegp);

    // Save the vehiclegp
    vehiclegpObj.save(function () {
      // Request Vehiclegps
      request(app).get('/api/vehiclegps')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Vehiclegp if not signed in', function (done) {
    // Create new Vehiclegp model instance
    var vehiclegpObj = new Vehiclegp(vehiclegp);

    // Save the Vehiclegp
    vehiclegpObj.save(function () {
      request(app).get('/api/vehiclegps/' + vehiclegpObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', vehiclegp.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Vehiclegp with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/vehiclegps/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Vehiclegp is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Vehiclegp which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Vehiclegp
    request(app).get('/api/vehiclegps/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Vehiclegp with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Vehiclegp if signed in', function (done) {
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

        // Save a new Vehiclegp
        agent.post('/api/vehiclegps')
          .send(vehiclegp)
          .expect(200)
          .end(function (vehiclegpSaveErr, vehiclegpSaveRes) {
            // Handle Vehiclegp save error
            if (vehiclegpSaveErr) {
              return done(vehiclegpSaveErr);
            }

            // Delete an existing Vehiclegp
            agent.delete('/api/vehiclegps/' + vehiclegpSaveRes.body._id)
              .send(vehiclegp)
              .expect(200)
              .end(function (vehiclegpDeleteErr, vehiclegpDeleteRes) {
                // Handle vehiclegp error error
                if (vehiclegpDeleteErr) {
                  return done(vehiclegpDeleteErr);
                }

                // Set assertions
                (vehiclegpDeleteRes.body._id).should.equal(vehiclegpSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Vehiclegp if not signed in', function (done) {
    // Set Vehiclegp user
    vehiclegp.user = user;

    // Create new Vehiclegp model instance
    var vehiclegpObj = new Vehiclegp(vehiclegp);

    // Save the Vehiclegp
    vehiclegpObj.save(function () {
      // Try deleting Vehiclegp
      request(app).delete('/api/vehiclegps/' + vehiclegpObj._id)
        .expect(403)
        .end(function (vehiclegpDeleteErr, vehiclegpDeleteRes) {
          // Set message assertion
          (vehiclegpDeleteRes.body.message).should.match('User is not authorized');

          // Handle Vehiclegp error error
          done(vehiclegpDeleteErr);
        });

    });
  });

  it('should be able to get a single Vehiclegp that has an orphaned user reference', function (done) {
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

          // Save a new Vehiclegp
          agent.post('/api/vehiclegps')
            .send(vehiclegp)
            .expect(200)
            .end(function (vehiclegpSaveErr, vehiclegpSaveRes) {
              // Handle Vehiclegp save error
              if (vehiclegpSaveErr) {
                return done(vehiclegpSaveErr);
              }

              // Set assertions on new Vehiclegp
              (vehiclegpSaveRes.body.name).should.equal(vehiclegp.name);
              should.exist(vehiclegpSaveRes.body.user);
              should.equal(vehiclegpSaveRes.body.user._id, orphanId);

              // force the Vehiclegp to have an orphaned user reference
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

                    // Get the Vehiclegp
                    agent.get('/api/vehiclegps/' + vehiclegpSaveRes.body._id)
                      .expect(200)
                      .end(function (vehiclegpInfoErr, vehiclegpInfoRes) {
                        // Handle Vehiclegp error
                        if (vehiclegpInfoErr) {
                          return done(vehiclegpInfoErr);
                        }

                        // Set assertions
                        (vehiclegpInfoRes.body._id).should.equal(vehiclegpSaveRes.body._id);
                        (vehiclegpInfoRes.body.name).should.equal(vehiclegp.name);
                        should.equal(vehiclegpInfoRes.body.user, undefined);

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
      Vehiclegp.remove().exec(done);
    });
  });
});
