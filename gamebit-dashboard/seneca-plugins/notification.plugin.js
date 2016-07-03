module.exports = function (options) {
    this.add({ role: 'notification', cmd: 'broadcast' }, function (args, done) {
        console.log(`received BROADCAST: ${args.msg}`)

        done()
    })
}