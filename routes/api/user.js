/**
 * Created by somdo on 24/03/2016.
 */
const router = require('express').Router()

router.get('/', function(req,res) {
    if (req.isAuthenticated()) {
        res.json(req.user)
    }
    else
        res.json({})
})

module.exports = router