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
    description: type.string()
})

module.exports = {User, Product, r: thinky.r}