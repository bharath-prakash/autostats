'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Vehicletype = mongoose.model('Vehicletype'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Vehicletype
 */
exports.create = function(req, res) {
  var vehicletype = new Vehicletype(req.body);
  vehicletype.user = req.user;

  vehicletype.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vehicletype);
    }
  });
};

/**
 * Show the current Vehicletype
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var vehicletype = req.vehicletype ? req.vehicletype.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  vehicletype.isCurrentUserOwner = req.user && vehicletype.user && vehicletype.user._id.toString() === req.user._id.toString();

  res.jsonp(vehicletype);
};

/**
 * Update a Vehicletype
 */
exports.update = function(req, res) {
  var vehicletype = req.vehicletype;

  vehicletype = _.extend(vehicletype, req.body);

  vehicletype.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vehicletype);
    }
  });
};

/**
 * Delete an Vehicletype
 */
exports.delete = function(req, res) {
  var vehicletype = req.vehicletype;

  vehicletype.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vehicletype);
    }
  });
};

/**
 * List of Vehicletypes
 */
exports.list = function(req, res) {
  Vehicletype.find().sort('-created').populate('user', 'displayName').exec(function(err, vehicletypes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(vehicletypes);
    }
  });
};

/**
 * Vehicletype middleware
 */
exports.vehicletypeByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Vehicletype is invalid'
    });
  }

  Vehicletype.findById(id).populate('user', 'displayName').exec(function (err, vehicletype) {
    if (err) {
      return next(err);
    } else if (!vehicletype) {
      return res.status(404).send({
        message: 'No Vehicletype with that identifier has been found'
      });
    }
    req.vehicletype = vehicletype;
    next();
  });
};
