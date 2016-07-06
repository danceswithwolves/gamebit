const $project = require('../services/project.service')
const logger  = require('../infrastructure/logger')

module.exports = function (options) {
    this.add({ role: 'project', cmd: 'create' }, function (args, done) {
        const project = args.project

        $project.create(project)
            .then(result => done(null, result))
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

    this.add({ role: 'project', cmd: 'update' }, function (args, done) {
        const project = args.project

        $project.update(project)
            .then(result => done(null, result))
            .catch(reason => {
                done(reason)
                
                logger.error(reason)
            })                
    })

    this.add({ role: 'project', cmd: 'archive' }, function (args, done) {
        const id = args.id

        $project.archive(id)
            .then(p => done(null, p))
            .catch(reason => {
                done(reason)
                
                logger.error(reason)
            })                
    })
}