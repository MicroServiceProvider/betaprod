/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 22/03/2016
 * Time: 15:55
 */
const router = require('express').Router()
const Product = require('../models').Product
const logger = require('../logger')

router.get('/:id', function(req, res){

    Product.get(req.params.id).then(function(product){
        res.json(product)
    }).catch(function(err){
        logger.info('Error fetching product',{err})
        res.sendStatus(404)
    })

})

module.exports = router