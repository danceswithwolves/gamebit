const db = require('../infrastructure/db').db

class ProjectService {
    create(project) {
        return db.insert(project, 'project')
    }

    update(project) {
        return db.update(project, 'project')
    }

    get(id) {
        return db.select(id, 'project')
    }

    archive(id) {
        return db.archive(id, 'project')
    }
}

module.exports = new ProjectService()