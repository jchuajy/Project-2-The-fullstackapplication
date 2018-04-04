/**
 * Order model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a user (be it C, R, U, D, or Login),
 * one or more of the functions here should be called.
 *
 * NOTE: You can add authentication logic in this model.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */


/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPool) => {
      return {
            addToCartById: (productId, userName, callback) => {

                  let firstQueryString = "SELECT * FROM users WHERE name = " + "'" + userName + "'";

                  dbPool.query(firstQueryString, (firstError, firstQueryResult) => {
                        //declare queryString
                        let queryString = "INSERT INTO orders (products_id, users_id, incart, quantity) VALUES ($1, $2, $3, $4)";
                        let values = [productId, firstQueryResult.rows[0].id, true, 1];

                        // execute query
                        dbPool.query(queryString, values, (error, queryResult) => {
                              // invoke callback function with results after query has executed
                              callback(error, queryResult);
                        });
                  });
            }
      };
};