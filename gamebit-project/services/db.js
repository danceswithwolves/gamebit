/// <reference path="../typings/index.d.ts" />

const assert = require('assert')
const Promise = require('bluebird')

class Db {    
    select(id, collection) {
        const fullId = collection ? `${collection}/${id}` : id

        return Promise.resolve(database.find(p => p.id === fullId))
    }

    selectByCollection(collection) {
        return Promise.resolve(database.filter(r => r.id.startsWith(`${collection}/`)))
    }

    insert(document, collection) {
        if (!document) return Promise.reject('missing document')
        if (!document.id && !collection) return Promise.reject('missing both document id and collection')
        if (!document.id && collection) {
            let collectionSize;
            
            return this.selectByCollection(collection)
                .then(docs => collectionSize = docs.length)
                .then(len => {
                    document.id = `${collection}/${collectionSize + 1}`
                })
                .then(() => database.push(document))
                .then(() => document.id)          
        } 

        return Promise.resolve(database.push(document))
                .then(() => document.id)
    }

    update(document) {
        assert(document.id, 'missing document id')

        return Promise.resolve(database.find(p => p.id === id))  // simulate async remote calls =]]
            .then(p => database.indexOf(p))
            .then(i => database.splice(i, 1, document))
    }

    delete(id) {
        assert(id, 'missing document id')

        return Promise.resolve(database.find(p => p.id === id))  // simulate async remote calls =]]
            .then(p => database.indexOf(p))
            .then(i => database.splice(i, 1))
    }
}

module.exports = new Db();

const database = [
    {
        id: 'project/1', 
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
        id: 'project/2',
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