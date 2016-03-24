const router = require('express').Router()
const Product = require('../models').Product

router.get('/', function(request, response) {
    Product.run().then(products => {
        response.json(products)
    })
})

module.exports = router