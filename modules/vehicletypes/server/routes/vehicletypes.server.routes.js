'use strict';

/**
 * Module dependencies
 */
var vehicletypesPolicy = require('../policies/vehicletypes.server.policy'),
  vehicletypes = require('../controllers/vehicletypes.server.controller');

module.exports = function(app) {
  // Vehicletypes Routes
  app.route('/api/vehicletypes').all(vehicletypesPolicy.isAllowed)
    .get(vehicletypes.list)
    .post(vehicletypes.create);

  app.route('/api/vehicletypes/:vehicletypeId').all(vehicletypesPolicy.isAllowed)
    .get(vehicletypes.read)
    .put(vehicletypes.update)
    .delete(vehicletypes.delete);

  // Finish by binding the Vehicletype middleware
  app.param('vehicletypeId', vehicletypes.vehicletypeByID);
};
