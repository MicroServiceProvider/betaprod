const path = require('path')
const fs = require('fs')
const process = require('process')

const db = 'betaprod'

if (process.env.NODE_ENV == 'production') {
    const publicKey = fs.readFileSync(path.join(__dirname,'/publicKey.crt')).toString().trim()

    module.exports = {
        servers: [{
            host: 'aws-us-east-1-portal.14.dblayer.com',
            port: 10770,
            ssl: {
                ca: publicKey
            }
        }],
        authKey: process.env.RDB_AUTH_KEY,
        db: db,
        timeoutError: 3000,
        buffer: 10,
        max: 100
    }
} else {
    module.exports = {db: db}
}