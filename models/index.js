const config = require('./config')
const thinky = require('thinky')(config)
const type = thinky.type

const User = thinky.createModel('User', {
    id: type.string(),
    providerId: type.string(),
    provider: type.string(),
    firstName: type.string(),
    lastName: type.string(),
    email: type.string(),
    photo: type.string()
})

User.ensureIndex('provider_providerId', function(doc) {
    return [doc('provider'), doc('providerId')]
})

const Product = thinky.createModel('Product', {
    id: type.string(),
    userId: type.string(),
    name: type.string(),
    imageUrl: type.string(),
    imageId: type.string(),
    website: type.string(),
    description: type.string(),
    createdAt: type.number()
})

Product.ensureIndex('createdAt')

Product.belongsTo(User, 'user', 'userId', 'id')

const Launch = thinky.createModel('Launch', {
    id: type.string(),
    userId:type.string(),
    productId:type.string()
})

Launch.ensureIndex('productId')

Launch.ensureIndex('userId_productId', function(doc) {
    return [doc('userId'), doc('productId')]
})

const NotYet = thinky.createModel('NotYet', {
    id: type.string(),
    userId:type.string(),
    productId:type.string()
})

NotYet.ensureIndex('productId')

NotYet.ensureIndex('userId_productId', function(doc) {
    return [doc('userId'), doc('productId')]
})



module.exports = {User, Product, Launch,NotYet, r: thinky.r}