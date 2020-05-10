const { Pool, Client } = require('pg')

const pool = new Pool({ connectionString: process.env.DB_DEV, ssl: true })

module.exports = {
    query: (text, params) => pool.query(text, params)
}