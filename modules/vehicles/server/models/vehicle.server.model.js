'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Vehicle Schema
 */
var VehicleSchema = new Schema({
  vehicleId: {
    type: String,
    default: '',
    required: 'Please fill Vehicle Id',
    trim: true
  },name: {
    type: String,
    default: '',
    required: 'Please fill Vehicle name',
    trim: true
  },alias: {
    type: String,
    default: '',
    trim: true
  },deviceId: {
    type: String,
    default: '',
    required: 'Please fill Device Id',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Vehicle', VehicleSchema);
