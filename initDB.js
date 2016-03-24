var User = require('./models').User
var Product = require('./models').Product

User.save({
    firstName:'Doron',
    lastName: 'Somech',
    email:'doron.somech@gmail.com',
    provider:'facebook',
    providerId: '10153767634642935'
}).then(user=> {
    console.log('user saved')
    Product.save({
        userId: user.id,
        name:'betaprod',
        excerpt:'It is a long established fact that a reader ' +
        'will be distracted by the readable content of a page when ' +
        'looking at its layout. The point of using Lorem Ipsum is that it ' +
        'has a more-or-less normal distribution of letters, ' +
        'as opposed to using Content here, content here, making it look like ' +
        'readable English. Many desktop publishing packages and ' +
        'web page editors now use Lorem Ipsum as ' +
        'their default model text, and a search for lorem ipsum ' +
        'will uncover many web sites still in their infancy. ' +
        'Various versions have evolved over the years, sometimes by accident, ' +
        ' on purpose (injected humour and the like).',
        imageUrl:'https://unsplash.com/photos/TMOeGZw9NY4'
    }).then(() =>{
        console.log('product saved')
    })
})