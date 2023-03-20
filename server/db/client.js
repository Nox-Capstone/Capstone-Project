const pg = require('pg');
const client = new pg.Client( 'postgres://localhost' || process.env.DATABASE_URL );

module.exports = client;
