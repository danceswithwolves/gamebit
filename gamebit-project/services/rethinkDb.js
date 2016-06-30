/// <reference path="../typings/rethinkdb.d.ts" />
// <ddreference path="../typings/modules/bluebird/index.d.ts" />

const r       = require('rethinkdb')
const Promise = require('bluebird')
const logger  = require('logger')

const DB_NAME            = 'gamebit_project'
const TABLE_NAME_PROJECT = 'project'

const connect     = Promise.promisify(r.connect, { context: r })

connect({ host: 'localhost', port: 28015 })
    .then(function (conn) {
        const cmd = r.dbList()
        const run = Promise.promisify(cmd.run, { context: cmd })

        run(conn)
            .then(dbs => {
                if (dbs.some(db => db === DB_NAME)) return Promise.reject('database exists')

                logger.debug('database not found -> create one with sample data')

                const cmd = r.dbCreate(DB_NAME)
                const run = Promise.promisify(cmd.run, { context: cmd })

                return run(conn)
            })
            .then(_ => {
                const cmd = r.db(DB_NAME).tableCreate(TABLE_NAME_PROJECT)
                const run = Promise.promisify(cmd.run, { context: cmd })

                return run(conn)
            })
            .then(_ => {
                const cmd = r.db(DB_NAME).table(TABLE_NAME_PROJECT).insert(sampleProjects)
                const run = Promise.promisify(cmd.run, { context: cmd})
                
                return run(conn)
            })
            .catch(reason => {
                logger.debug(reason)
            })
})

module.exports = r

const sampleProjects = [
    {
        id: 'project1', 
        name: 'The New Office Outfitters', 
        client: { 
            name: 'Office Outfitters',
            location: 'Cincinnati, Ohio, United States',
            business: 'retail',
            tags: [ 'retail', 'office furniture and facility' ],
            contacts: [{
                name: 'Dave Louis',
                title: 'Vice President',
                email: 'dave.louis@officeoutfitters.com'
            }]
        },
        mission: {
            goals: [ 'make www.officeoutfitters.com scale', 'put www.officeoutiftters.com on cloud' ],
            constraints: [],
        }
    },
    { 
        id: 'project2',
        name: 'Harmony', 
        client: { 
            name: 'Unicorn Media Group',
            location: 'New York, United States',
            business: 'media',
            tags: [ 'media', 'business intelligence' ],
            contacts: [{
                name: 'Matt Daemon',
                title: 'Director of Technology',
                email: 'matt.daemon@unicornmediagroup.com'
            }]
        },
        mission: {
            goals: [ 'build a data processing flow that is flexible and configurable for UMG needs' ],
            constraints: [
                { 
                    technologies: [ 'Node', 'Go', 'Kafka', 'Hadoop' ],
                    approach: 'microservices'
                } 
            ],
        }
    }
]