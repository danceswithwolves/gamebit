const db = require('./services/db')
const r  = require('./services/rethinkDb')

class ProjectService {
    create(project) {
        return db.insert(project, 'project')
    }

    update(project) {
        return db.update(project)
    }

    get(id) {
        return db.select(id)
    }

    archive(id) {
        return db.delete(id)
    }
}

module.exports = new ProjectService()