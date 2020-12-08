module.exports = {
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap')
    }

    if (process.env.APP_ENV && process.env.APP_ENV === 'LOCALHOST') {
      config.devtool = 'cheap-module-eval-source-map'
    }

    // enable top-level await, see pages/api/gql/index.ts for usecase.
    config.experiments = { topLevelAwait: true }
    return config
  },
}
