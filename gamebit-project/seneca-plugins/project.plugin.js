const $project = require('../services/project.service')
const logger  = require('../infrastructure/logger')

module.exports = function (options) {
    this.add({ role: 'project', cmd: 'create' }, function (args, done) {
        const project = args.project

        $project.create(project)
            .then(id => done(null, { id }))
            .catch(reason => {
                done(reason)

                logger.error(reason)
            })
    })

    this.add({ role: 'project', cmd: 'get' }, function (args, done) {
        const id = args.id

        $project.get(id)
            .then(p => done(null, p))
            .catch(reason => {
                done(reason)
                 
                logger.error(reason)
            })
    })
}