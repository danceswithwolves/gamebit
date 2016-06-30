const winston = require('winston')

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: true
        }),
        new (winston.transports.File)({ 
            level: 'info',
            handleExceptions: true,
            filename: 'gamebit-project.log' 
        })
    ],
    exitOnError: false
});

module.exports = logger