const $project = require('./project.service')
const logger   = require('./services/logger')
const seneca   = require('seneca')()
const util     = require('util')
const Promise  = require('bluebird')

seneca.add({ role: 'project', cmd: 'create' }, function (args, done) {
    const project = args.project

    $project.create(project)
        .then(id => done(null, { id }))
})

seneca.add({ role: 'project', cmd: 'get' }, function (args, done) {
    const id = args.id

    $project.get(id)
        .then(p => done(null, p))
})

seneca.listen(53001)

// demo
const act = Promise.promisify(seneca.act, { context: seneca })

act({ role: 'project', cmd: 'get', id: 'project/1' })
    .then(result => {
        console.log(`get/existing: ${util.inspect(result)}`)
        
        return act({ role: 'project', cmd: 'create', project: { name: 'A Whole New World' }})
    })
    .then(result => {
        console.log(`create: ${util.inspect(result)}`)
        
        return act({ role: 'project', cmd: 'get', id: 'project/3' })
    })
    .then(result => {
        console.log(`get newly-created: ${util.inspect(result)}`)
    })
    .catch(err => console.log(`error ${err}`))