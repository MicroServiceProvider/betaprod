const router = require('express').Router()
const Product = require('../../models/index').Product
const cloudinary = require('cloudinary')

router.get('/', function(request, response) {
    Product.run().then(products => {
        response.json(products.map(p=> {
            return {
                id: p.id,
                name: p.name,
                excerpt: p.excerpt,
                imageUrl: p.imageUrl || cloudinary.url(p.imageId,
                    {width: 432, height: 325,  crop: 'pad'})
            }
        }))
    })
})

module.exports = router