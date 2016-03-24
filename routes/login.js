'use strict'
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models').User
const token = require('../token')
const logger = require('../logger')
const process = require('process')

let callback = 'http://localhost:3001/login/facebook/callback'

if (process.env.NODE_ENV == 'production') {
    callback = 'http://betaprod.co/login/facebook/callback'
}

passport.use(new FacebookStrategy({
    clientID: '808953575900122',
    clientSecret: 'f6f4842997558f16642f41d8f0cef3b6',
    callbackURL: callback,
    enableProof: true,
    profileFields:['id', 'displayName', 'email','first_name','last_name','picture']
}, function(accessToken, refreshToken, profile, done) {
    User.getAll(['facebook', profile.id], {index: 'provider_providerId'}).run().then(users => {
        if(users.length == 0) {
            // new user
            logger.info(`New facebook user ${profile.name.givenName} ${profile.name.familyName} ${profile.emails[0].value}`)
            return User.save({
                providerId: profile.id,
                provider: 'facebook',
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value
            })
        }
        else {
            return users[0]
        }
    }).then(user => done(null, {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo
    })).catch(
        err => {
            logger.error('error when trying to fetch user from DB', {err: err})
            done(err)
        }
    )
}))

var router = require('express').Router()

router.get('/facebook', passport.authenticate('facebook', {scope: ['email', 'public_profile']}))
router.get('/facebook/callback',
    passport.authenticate('facebook', {session:false}),
    token.login({redirect:'/'}))
router.get('/logout', token.logout({redirect:'/'}))

module.exports = router