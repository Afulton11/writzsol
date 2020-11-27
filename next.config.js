module.exports = {
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap')
    }

    if (process.env.VERCEL_URL.includes('localhost')) {
      config.devtool = 'eval-source-map'
    }
    return config
  },
}
