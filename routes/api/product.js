/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 22/03/2016
 * Time: 15:55
 */
const router = require('express').Router()
const Product = require('../../models/index').Product
const logger = require('../../logger')
const token = require('../../token')
const upload = require('multer')({ dest: 'public/images/' })
const cloudinary = require('cloudinary')
const process = require('process')

if (process.env.NODE_ENV == 'production') {
    cloudinary.config({
        cloud_name: process.env.CLDNRY_NAME,
        api_key: process.env.CLDNRY_KEY,
        api_secret: process.env.CLDNRY_SECRET
    })
}

router.get('/:id', token.auth(), function(req, res) {
    // TODO: should check if the user has permission for this product
    Product.get(req.params.id).then(function(product){
        res.json(product)
    }).catch(function(err){
        logger.info('Error fetching product',{err})
        res.sendStatus(404)
    })
})

function saveProduct(imageUrl, req, res) {
    Product.save({
        userId: req.user.id,
        name: req.body.name,
        excerpt: req.body.excerpt,
        imageUrl: imageUrl,
        website: req.body.website,
        description: req.body.description
    }).then(p=> {
        logger.info(`new product ${p.name}`)
        res.json(p)
    })
}

router.post('/', token.auth(), upload.single('file'), function(req, res) {
    if (process.env.NODE_ENV == 'production') {
        cloudinary.uploader.upload(req.file.path, result =>
                saveProduct(cloudinary.url(result.public_id), req, res),
            {width: 360, height: 400})
    }
    else {
        saveProduct(`images/${req.file.filename}`,req, res)
    }
})

module.exports = router