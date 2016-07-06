/// <reference path="typings/index.d.ts" />

require('./bootstrap')

const seneca  = require('seneca')()
const plugins = require('./seneca-plugins')

seneca
    .use(plugins.sys)
    .use(plugins.project)
    .use('mesh', { 
        auto: true, 
        listen: [
            { pin: { role: 'project' } /*, port: config.GP_LISTEN_PORT*/ },
            { pin: { role: 'sys' }, model: 'observe' } 
        ]
    })

