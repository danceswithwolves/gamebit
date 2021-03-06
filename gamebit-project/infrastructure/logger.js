/// <reference path="../typings/index.d.ts" />

const winston = require('winston')

const logger = new (winston.Logger)({
    // colors: {
    //     trace: 'magenta',
    //     input: 'grey',
    //     verbose: 'cyan',
    //     prompt: 'grey',
    //     debug: 'blue',
    //     info: 'green',
    //     data: 'grey',
    //     help: 'cyan',
    //     warn: 'yellow',
    //     error: 'red'
    // },
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
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