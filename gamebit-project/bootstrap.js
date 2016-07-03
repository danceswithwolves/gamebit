require('dotenv').config()                               // apply custom env (from file .env)

const ensureSchema = require('./infrastructure/db').ensureSchema

ensureSchema()

