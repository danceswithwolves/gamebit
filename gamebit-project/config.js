/// <reference path="typings/index.d.ts" />

const nconf = require('nconf')

const requiredSettings = [ 'NODE_ENV', 'GP_DB_HOST', 'GP_DB_PORT', 'GP_DB_NAME', 'GP_LISTEN_PORT' ]

nconf
    .env(requiredSettings)
    .file('./config.json')
    .defaults({
        NODE_ENV               : 'development',
        GP_DB_HOST             : 'localhost',
        GP_DB_PORT             : 28015,
        GP_DB_NAME             : 'gamebit_project',
        GP_DB_CONNECTION_MAX   : 100,
        GP_DB_CONNECTION_BUFFER: 10,
        GP_LISTEN_PORT         : 53001
    })

nconf.required(requiredSettings)

module.exports = {
    NODE_ENV                : nconf.get('NODE_ENV'),
    GP_DB_HOST              : nconf.get('GP_DB_HOST'),
    GP_DB_PORT              : nconf.get('GP_DB_PORT'),
    GP_DB_NAME              : nconf.get('GP_DB_NAME'),
    GP_DB_CONNECTION_MAX    : nconf.get('GP_DB_CONNECTION_MAX'),
    GP_DB_CONNECTION_BUFFER : nconf.get('GP_DB_CONNECTION_BUFFER'),
    GP_LISTEN_PORT          : nconf.get('GP_LISTEN_PORT')
}