var winston = require('winston')

var logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'betaprod.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log',
            humanReadableUnhandledException: true
        })
    ]
})

module.exports = logger