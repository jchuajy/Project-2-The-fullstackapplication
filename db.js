/**
 * Postgres database configuration.
 *
 * Import models and `pg` package.
 * Initialise configuration object with database credentials.
 * Initialise the connection pool with config object.
 *
 * Export the pool and models as a module using `module.exports`.
 */


const pg = require('pg');
const userDB = require('./models/user');
const productDB = require('./models/product');

const configs = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'rugby_jersey',
  port: 5432
}

const pool = new pg.Pool(configs);

pool.on('error', (err) => {
  console.log('pg client error', err.message, err.stack);
})

module.exports = {
  pool: pool,
  userDB: userDB(pool),
  productDB: productDB(pool)
}
