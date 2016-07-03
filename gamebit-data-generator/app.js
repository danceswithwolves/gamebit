const seneca  = require('seneca')()

const projects = require('./projects.data')

seneca
    .use('mesh', {
        auto: true
    })

// notification
const util    = require('util')
const Promise = require('bluebird')
const act     = Promise.promisify(seneca.act, { context: seneca })

act({ role: 'notification', cmd: 'broadcast', msg: '+1 gamebit-data-generator' })
    .then(result => {
        console.log('broadcast self-introduction')
    })
    .catch(err => console.log(`error ${err}`))

let promise = Promise.resolve()

for (let record of projects) {
    promise = promise.then(() =>
        act({ role: 'project', cmd: 'create', project: record })
            .then(result => {
                console.log(`create: ${util.inspect(result)}`)
                
                return act({ role: 'project', cmd: 'get', id: result.id })
            })
            .then(result => console.log(`get newly-created: ${util.inspect(result)}`))
            .catch(err => console.log(`error ${err}`))
    )
} 


