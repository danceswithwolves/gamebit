/// <reference path="../typings/index.d.ts" />

const assert  = require('assert')
const util    = require('util')
const config  = require('../config')
const logger  = require('./logger')

const srvcfg  = { 
    host: config.GP_DB_HOST, 
    port: config.GP_DB_PORT, 
    db: config.GP_DB_NAME 
}

const r = require('rethinkdbdash')({ 
    servers: [ srvcfg ], 
        max: config.GP_DB_CONNECTION_MAX || 100, 
        buffer: config.GP_DB_CONNECTION_BUFFER || 10 
    })

class Db {    
    select(id, collection) {       
        return r.table(collection).get(id).run() 
    }

    insert(document, collection) {
        return r.table(collection).insert(document).run()
                .then(result => ( 
                    result.document_id = document.id || result.generated_keys[0],
                    result 
                ))
    }

    update(document, collection) {
        return r.table(collection).update().run()
    }

    delete(id, collection) {
        return r.table(collection).get(id).delete().run()
    }

    archive(id, collection) {
        let document

        return r.table(collection).get(id).run()
                .then(d => {
                    d.__id = id
                    delete d.id

                    return document = d
                })
                .then(d => r.table('archive').insert(d).run())
                .then(_ => r.table(collection).get(id).delete().run())
                .then(_ => document)
    }
}

function ensureSchema() {
    require('rethinkdb-init')(r)

    r.init(srvcfg,
        [
            'project',
            'archive'
        ]
    )
}

module.exports = {
    db: new Db(),
    r,
    ensureSchema
}