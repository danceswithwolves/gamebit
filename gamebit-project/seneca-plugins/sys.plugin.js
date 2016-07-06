const logger = require('../infrastructure/logger')

module.exports = function (options) {
    this.add({ role: 'sys', cmd: 'term' }, function (args, done) {
        logger.warn(`received sys.term: ${args.msg}`)

        done()

        process.exit(0)
    })
}