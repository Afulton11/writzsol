module.exports = {
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap')
    }

    if (process.env.VERCEL_URL.includes('localhost')) {
      config.devtool = 'eval-source-map'
    }

    // enable top-level await, see pages/api/gql/index.ts for usecase.
    config.experiments = { topLevelAwait: true }
    return config
  },
}
