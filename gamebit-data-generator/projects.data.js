module.exports = [
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
            constraints: [ 'azure | amazon' ],
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
    },
    {
        id: 'project/3',
        name: 'Media Branches'
    }
]