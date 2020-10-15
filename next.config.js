const webpack = require('webpack');

module.exports = {
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    config.devtool = 'eval-source-map';
    return config;
  }
};
