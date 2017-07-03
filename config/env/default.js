'use strict';

module.exports = {
  app: {
    title: 'MyServices.com',
    description: 'A services platform which brings both consumer and service provider on platform to bid and get your job done.',
    keywords: 'consumer services, service jobs',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  logo: 'modules/core/img/brand/logo.png',
  favicon: 'modules/core/img/brand/favicon.ico'
};
