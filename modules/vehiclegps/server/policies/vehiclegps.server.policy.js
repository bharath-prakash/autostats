'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Vehiclegps Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin','user'],
    allows: [{
      resources: '/api/vehiclegps',
      permissions: '*'
    }, {
      resources: '/api/vehiclegps/:vehiclegpId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/vehiclegps',
      permissions: ['get', 'post']
    }, {
      resources: '/api/vehiclegps/:vehiclegpId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/vehiclegps',
      permissions: ['get']
    }, {
      resources: '/api/vehiclegps/:vehiclegpId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Vehiclegps Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Vehiclegp is being processed and the current user created it then allow any manipulation
  if (req.vehiclegp && req.user && req.vehiclegp.user && req.vehiclegp.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
