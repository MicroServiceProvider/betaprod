const r = require('./models').r
const User = require('./models').User
const Product = require('./models').Product
const process = require('process')

r.db('betaprod').table('User').delete().run().
then(() => r.db('betaprod').table('Product').delete().run()).
then(() => User.save({
        firstName:'Doron',
        lastName: 'Somech',
        email:'doron.somech@gmail.com',
        provider:'facebook',
        providerId: '10153767634642935'
    })).
then(user =>
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
        imageUrl:'http://unsplash.com/photos/TMOeGZw9NY4',
        description:'Lorem ipsum dolor sit amet, duo nullam labore albucius ut, ' +
        'suscipit voluptua te nec. Eum no invenire interesset consectetuer, ' +
        'no sed illud commune accusata. Tacimates suavitate has at, option indoctum ' +
        'vituperatoribus eam cu. Et quo quando perfecto scriptorem, mutat choro utinam' +
        ' vis ex. Vivendo omittam ad per. Aliquid argumentum vix id, nihil alterum ' +
        'consequuntur id eum.' +
        'Ut esse mazim nihil pri, ut causae alterum has.' +
        'Nam veniam theophrastus ne, id nec soleat alterum. His ' +
        'solum facilisis quaerendum ei, eos ei tollit suscipiantur.' +
        ' Cum prima aliquip iracundia ex. Quo ea ullum timeam sapientem.' +
        ' Justo iudicabit vituperatoribus id eam, odio congue minimum te quo.',
        website:'http://betaprod.co'
    })).
then(() => {
    console.log('all done')
    process.exit()
})