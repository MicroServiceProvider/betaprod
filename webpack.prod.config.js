const webpack = require('webpack')
const config = require('./webpack.config')

config.plugins = [...config.plugins,
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        }})
]

module.exports = config


