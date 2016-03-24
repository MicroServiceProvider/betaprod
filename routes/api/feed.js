const router = require('express').Router()
const Product = require('../../models/index').Product

router.get('/', function(request, response) {
    Product.run().then(products => {
        response.json(products.map(p=> {
            return {
                id: p.id,
                name: p.name,
                excerpt: p.excerpt,
                imageUrl: p.imageUrl
            }
        }))
    })
})

module.exports = router