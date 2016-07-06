const seneca  = require('seneca')()
const logger  = require('./infrastructure/logger')

const projects = require('./projects.data')

seneca
    .use('mesh', {
        auto: true
    })

// generate project data
const util    = require('util')
const Promise = require('bluebird')
const act     = Promise.promisify(seneca.act, { context: seneca })

let promise = Promise.resolve()

for (let record of projects) {
    promise = promise.then(() =>
        act({ role: 'project', cmd: 'create', project: record })
            .then(result => {
                logger.info(`---`)
                logger.info(`create: ${util.inspect(result)}`)
                
                return act({ role: 'project', cmd: 'get', id: result.document_id })
            })
            .then(result => logger.info(`get newly-created: ${util.inspect(result)}`))
            .catch(err =>logger.error(`${err}`))
    )
} 

promise.then(() => {
    logger.info(`---`)
    logger.info(`archive project/3`)

    return act({ role: 'project', cmd: 'archive', id: 'project/3' })
})
.then(result => logger.info(`archived: ${util.inspect(result)}`))
.catch(err =>logger.error(`${err}`))
.then(() => process.exit(0))


// sys.term
// setTimeout(function () {
//     act({ role: 'sys', cmd: 'term', msg: 'bye' })
//         .then(result => {
//             logger.warn('broadcast sys.term')
//         })
//         .catch(err => logger.error(`${err}`))
// }, 10000)
