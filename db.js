const { Pool, Client } = require('pg')

let endpoint = process.env.DATABASE_URL;
if (process.env.NODE_ENV !== 'production') {
    endpoint = process.env.DB_DEV
}

const pool = new Pool({ connectionString: endpoint, ssl: false })

module.exports = {
    query: (text, params) => pool.query(text, params)
}