/// <reference path="typings/index.d.ts" />

require('./bootstrap')

// const config  = require('./config')
const plugins = require('./seneca-plugins')
const seneca  = require('seneca')()

seneca
    .use(plugins.project)
    .use(plugins.notification)
    .use('mesh', { 
        auto: true, 
        listen: [
            { pin: { role: 'project' } /*, port: config.GP_LISTEN_PORT*/ },
            { pin: { role: 'notification', cmd: 'broadcast' }, model: 'observe' } 
        ]
    })

// notification
const Promise = require('bluebird')
const act     = Promise.promisify(seneca.act, { context: seneca })

act({ role: 'notification', cmd: 'broadcast', msg: '+1 gamebit-project' })
    .then(result => {
        console.log('broadcast self-introduction')
    })
    .catch(err => console.log(`error ${err}`))
