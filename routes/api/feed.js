const router = require('express').Router()
const Product = require('../../models/index').Product
const Launch = require('../../models/index').Launch
const r = require('../../models/index').r
const cloudinary = require('cloudinary')

router.get('/', function(request, response) {
    Product.orderBy({index: r.desc('createdAt')}).run().then(products => {
        response.json(products.map(p=> {
            return {
                id: p.id,
                name: p.name,
                description: p.description,
                imageUrl: p.imageUrl || cloudinary.url(p.imageId,
                    {width: 432, height: 325,  crop: 'pad'})
            }
        }))
    })
})

router.get('/featured', function(request, response) {
    Product.getJoin({upvotes:true}).map(p=> {
        return {product: p, count: p('upvotes').count()}
    }).orderBy('count').limit(3).execute().
    then(products => response.json(products.map(p=> {
        return { id: p.product.id,
            name: p.product.name,
            description: p.product.description,
            imageUrl: p.product.imageUrl || cloudinary.url(p.product.imageId,
                {width: 432, height: 325,  crop: 'pad'})}
    })))
})

module.exports = router