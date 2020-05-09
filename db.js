const { Pool, Client } = require('pg')

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: false})

module.exports = {
    query: (text, params) => pool.query(text, params)
}