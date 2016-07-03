/// <reference path="../typings/index.d.ts" />

const winston = require('winston')

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: false
        }),
        new (winston.transports.File)({ 
            level: 'error',
            handleExceptions: true,
            json: false,
            filename: 'gamebit-project-error.log' 
        })
    ],
    exitOnError: false
});

module.exports = logger