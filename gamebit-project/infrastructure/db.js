/// <reference path="../typings/index.d.ts" />

const assert  = require('assert')
const util    = require('util')
const config  = require('../config')

const server  = { 
                    host: config.GP_DB_HOST, 
                    port: config.GP_DB_PORT, 
                    db: config.GP_DB_NAME 
                }

const r = require('rethinkdbdash')({ 
    servers: [ server ], 
        max: config.GP_DB_CONNECTION_MAX || 100, 
        buffer: config.GP_DB_CONNECTION_BUFFER || 10 
    })

class Db {    
    select(id, collection) {       
        return r.table(collection).get(id).run() 
    }

    insert(document, collection) {
        return r.table(collection).insert(document).run()
                .then(ret => document.id || ret.generated_keys.length[0])
    }
}

function ensureSchema() {
    require('rethinkdb-init')(r)

    r.init(server,
        [
            'project'
        ]
    )
}

module.exports = {
    db: new Db(),
    r,
    ensureSchema
}