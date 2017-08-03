'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Vehiclegp Schema
 */
var VehiclegpSchema = new Schema({
   vehicleId: {
    type: String,
    default: '',
    trim: true
  },currentLocation: {
     'type': {
        type: String,
        required: true,
        enum: ['Point', 'LineString', 'Polygon'],
        default: 'Point'
      },
      coordinates: [
        [
          { type: [ Number ] }
        ]
      ]
  },deviceId: {
    type: String,
    default: '',
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

mongoose.model('Vehiclegp', VehiclegpSchema);
