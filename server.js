'use strict'
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const token = require('./token')
const logger = require('./logger')
const login = require('./routes/login')
const feed = require('./routes/feed')

require('./models')

// Configure express
const app = new express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(token.initialize(passport, {secret: '120casd!CASC2@42149-&2asc20'}))

app.set('port', (process.env.PORT || 3001))
if (app.get('env') === 'development') {
    // Configure webpack
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackConfig = require('./webpack.dev.config')
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}))
    app.use(webpackHotMiddleware(compiler))
}

// Serve all files from public directory
app.use(express.static('public'))

// Routes
app.use('/login', login)
app.use('/api/feed', feed)

// Serve index file for all known paths
function serveIndex(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
}
app.get('/post', serveIndex)

// Start app
app.listen(app.get('port'), function () {
    logger.info(`Running in ${app.get('env')} mode on port ${app.get('port')}`)
})