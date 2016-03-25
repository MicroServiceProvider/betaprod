/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 22/03/2016
 * Time: 15:55
 */
const router = require('express').Router()
const Product = require('../../models/index').Product
const Launch = require('../../models/index').Launch
const NotYet = require('../../models/index').NotYet
const logger = require('../../logger')
const token = require('../../token')
const upload = require('multer')({ dest: 'public/images/products' })
const cloudinary = require('cloudinary')
const process = require('process')

if (process.env.NODE_ENV == 'production') {
    cloudinary.config({
        cloud_name: process.env.CLDNRY_NAME,
        api_key: process.env.CLDNRY_KEY,
        api_secret: process.env.CLDNRY_SECRET
    })
}

function getProduct(productId, res) {
    Product.get(productId).getJoin({user:true}).run().then(function(product){
        const result = Object.assign({}, product)
        result.imageUrl =  product.imageUrl || cloudinary.url(product.imageId,
                {width: 432, height: 325,  crop: 'pad'})
        result.user = {
            firstName: product.user.firstName,
            lastName: product.user.lastName,
            photo: product.user.photo
        }
        //res.json(result)

        Launch.filter({
            productId: productId
        }).count().execute().then(count => {
            result.launch = count

            NotYet.filter({
                productId: productId
            }).count().execute().then(notYetCount=> {
                result.notYet = notYetCount
                res.json(result)
            })
        })

    }).catch(function(err){
        logger.info('Error fetching product',{err})
        res.sendStatus(404)
    })
}

router.get('/:id', function(req, res) {
    // TODO: should check if the user has permission for this product
    getProduct(req.params.id, res)
})

function saveProduct(imageUrl,imageId, req, res) {
    Product.save({
        userId: req.user.id,
        name: req.body.name,
        imageUrl: imageUrl,
        imageId: imageId,
        website: req.body.website,
        description: req.body.description,
        createdAt: (new Date).getTime()
    }).then(p=> {
        logger.info(`new product ${p.name}`)
        res.json(p)
    })
}

router.post('/', token.auth(), upload.single('file'), function(req, res) {
    if (process.env.NODE_ENV == 'production') {
        cloudinary.uploader.upload(req.file.path, result =>
                saveProduct(null, result.public_id, req, res))
    }
    else {
        saveProduct(`images/${req.file.filename}`,null,req, res)
    }
})

router.post('/launch/:id', token.auth(), function(req, res) {
    const userId = req.user.id
    const productId = req.params.id

    Launch.getAll([userId, productId], {index: 'userId_productId'}).count().execute().
        then(count=> {
            // we don't allow double register
            if (count == 0) {
                Launch.save({userId, productId}).then(
                    () => getProduct(productId, res))
            }
            else {
                getProduct(productId, res)
            }
        })
})

router.post('/notyet/:id', token.auth(), function(req, res) {
    const userId = req.user.id
    const productId = req.params.id

    NotYet.getAll([userId, productId], {index: 'userId_productId'}).count().execute().
    then(count=> {
        // we don't allow double register
        if (count == 0) {
            NotYet.save({userId, productId}).then(
                () => getProduct(productId, res))
        }
        else {
            getProduct(productId, res)
        }
    })
})

module.exports = router