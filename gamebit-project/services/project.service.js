const db = require('../infrastructure/db').db

class ProjectService {
    create(project) {
        return db.insert(project, 'project')
    }

    update(project) {
        return db.update(project)
    }

    get(id) {
        return db.select(id, 'project')
    }

    archive(id) {
        return db.delete(id)
    }
}

module.exports = new ProjectService()