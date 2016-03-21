const winston = require('winston')
const process = require('process')
const Papertrail = require('winston-papertrail').Papertrail

if (process.env.NODE_ENV == 'production') {
    module.exports = new winston.Logger({
        transports: [
            new Papertrail({
                host: process.env.PPRTRL_HOST,
                port: process.env.PPRTRL_PORT,
                handleExceptions: true
            }),
            new (winston.transports.Console)({
                handleExceptions: true,
                humanReadableUnhandledException: true
            })
        ]
    })
}
else {
    module.exports = new winston.Logger({
        transports: [
            new (winston.transports.Console)({
                handleExceptions: true,
                humanReadableUnhandledException: true
            }),
            new (winston.transports.File)({filename: 'betaprod.log'})
        ],
        exceptionHandlers: [
            new winston.transports.File({
                filename: 'exceptions.log',
                humanReadableUnhandledException: true
            })
        ]
    })
}