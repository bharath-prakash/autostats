'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Vehiclegp = mongoose.model('Vehiclegp'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Vehiclegp
 */
exports.create = function(req, res) {
  var vehiclegp = new Vehiclegp(req.body);
  vehiclegp.user = req.user;

  vehiclegp.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vehiclegp);
    }
  });
};

/**
 * Show the current Vehiclegp
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var vehiclegp = req.vehiclegp ? req.vehiclegp.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  vehiclegp.isCurrentUserOwner = req.user && vehiclegp.user && vehiclegp.user._id.toString() === req.user._id.toString();

  res.jsonp(vehiclegp);
};

/**
 * Update a Vehiclegp
 */
exports.update = function(req, res) {
  var vehiclegp = req.vehiclegp;

  vehiclegp = _.extend(vehiclegp, req.body);

  vehiclegp.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vehiclegp);
    }
  });
};

/**
 * Delete an Vehiclegp
 */
exports.delete = function(req, res) {
  var vehiclegp = req.vehiclegp;

  vehiclegp.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vehiclegp);
    }
  });
};

/**
 * List of Vehiclegps
 */
exports.list = function(req, res) {
  Vehiclegp.find().sort('-created').populate('user', 'displayName').exec(function(err, vehiclegps) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vehiclegps);
    }
  });
};

/**
 * Vehiclegp middleware
 */
exports.vehiclegpByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Vehiclegp is invalid'
    });
  }

  Vehiclegp.findById(id).populate('user', 'displayName').exec(function (err, vehiclegp) {
    if (err) {
      return next(err);
    } else if (!vehiclegp) {
      return res.status(404).send({
        message: 'No Vehiclegp with that identifier has been found'
      });
    }
    req.vehiclegp = vehiclegp;
    next();
  });
};
