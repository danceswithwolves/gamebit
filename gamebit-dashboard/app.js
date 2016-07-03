const seneca   = require('seneca')()

seneca
    .use('./seneca-plugins/notification.plugin')
    .use('mesh', {
        auto: true,
        pin: { role: 'notification', cmd: 'broadcast' }, 
        model: 'observe' 
    })

// notification
const Promise = require('bluebird')
const act     = Promise.promisify(seneca.act, { context: seneca })

act({ role: 'notification', cmd: 'broadcast', msg: '+1 gamebit-dashboard' })
    .then(result => {
        console.log('broadcast self-introduction')
    })
    .catch(err => console.log(`error ${err}`))

