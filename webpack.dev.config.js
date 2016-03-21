const webpack = require('webpack')
const config = require('./webpack.config')

config.devtool = 'source-map'
config.entry = ['webpack-hot-middleware/client',...config.entry]
config.plugins = [
    ...config.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()]

module.exports = config