const config = require('./config')
const thinky = require('thinky')(config);
const type = thinky.type;

const User = thinky.createModel('User', {
    id: type.string(),
    providerId: type.string(),
    provider: type.string(),
    firstName: type.string(),
    lastName: type.string(),
    email: type.string()
})

User.ensureIndex('provider_providerId', function(doc) {
    return [doc('provider'), doc('providerId')]
})

module.exports = {User}