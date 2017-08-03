'use strict';

/**
 * Module dependencies
 */
var vehiclegpsPolicy = require('../policies/vehiclegps.server.policy'),
  vehiclegps = require('../controllers/vehiclegps.server.controller');

module.exports = function(app) {
  // Vehiclegps Routes
  app.route('/api/vehiclegps').all(vehiclegpsPolicy.isAllowed)
    .get(vehiclegps.list)
    .post(vehiclegps.create);

  app.route('/api/vehiclegps/:vehiclegpId').all(vehiclegpsPolicy.isAllowed)
    .get(vehiclegps.read)
    .put(vehiclegps.update)
    .delete(vehiclegps.delete);

  // Finish by binding the Vehiclegp middleware
  app.param('vehiclegpId', vehiclegps.vehiclegpByID);
};
