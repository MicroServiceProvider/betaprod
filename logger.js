var winston = require('winston')

var logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)({
            handleExceptions: true,
            humanReadableUnhandledException: true
        }),
        new (winston.transports.File)({ filename: 'betaprod.log' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log',
            humanReadableUnhandledException: true
        })
    ]
})

module.exports = logger