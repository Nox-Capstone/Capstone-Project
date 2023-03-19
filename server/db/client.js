const pg = require('pg');
const client = new pg.Client('postgres://localhost/noxDB' || process.env.DATABASE_URL);

module.exports = client;
