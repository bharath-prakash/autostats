'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/materialize/dist/css/materialize.css',
        'public/lib/slick-carousel/slick/slick.css',
        'public/lib/slick-carousel/slick/slick-theme.css',
        'public/lib/angular-materialize/css/materialize.clockpicker.css',
        'public/lib/nvd3/build/nv.d3.css',
        'public/lib/leaflet/dist/leaflet.css',
        'public/lib/ng-scrollbar/dist/ng-scrollbar.css',
        'public/lib/leaflet-label/leaflet.label.css',
        'public/lib/nouislider/distribute/nouislider.css',
        'public/lib/leaflet-mastercluster/dist/MarkerCluster.css',
        'public/lib/leaflet-mastercluster/dist/MarkerCluster.Default.css'
      ],
      js: [
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/materialize/dist/js/materialize.js',
        'public/lib/nouislider/distribute/nouislider.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-router/release/stateEvents.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/dist/angular-file-upload.js',
        'public/lib/Snap.svg/dist/snap.svg.js',
        'public/lib/jquery/dist/jquery.js',
        'public/lib/slick-carousel/slick/slick.js',
        'public/lib/angular-slick/dist/slick.js',
        'public/lib/angular-materialize/src/angular-materialize.js',
        'public/lib/d3/d3.min.js',
        'public/lib/nvd3/build/nv.d3.min.js',
        'public/lib/angular-nvd3/dist/angular-nvd3.min.js',
        'public/lib/leaflet/dist/leaflet.js',
        'public/custom/Bing.js',
        'public/custom/Google.js',
        'public/lib/leaflet-rotate/leaflet.rotatedMarker.js',
        'public/lib/leaflet-marker/MovingMarker.js',
        'public/lib/leaflet-label/leaflet.label.js',
        'public/lib/leaflet-mastercluster/dist/leaflet.markercluster.js',
        'public/lib/angular-simple-logger/dist/angular-simple-logger.js',
        'public/lib/ui-leaflet/dist/ui-leaflet.js',
        'public/custom/ui-leaflet-layers.min.js'
        

      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
