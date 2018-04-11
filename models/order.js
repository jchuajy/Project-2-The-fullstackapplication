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
            addToCartById: (productId, userId, callback) => {

                  let queryStringa = "SELECT * FROM products WHERE id = " + productId;

                  dbPool.query(queryStringa, (errora, queryResulta) => {
                        //declare queryString
                        let queryString = "INSERT INTO orders (products_id, users_id, incart, quantity, is_deleted, price, completedorder) VALUES ($1, $2, $3, $4, $5, $6, $7)";
                        let values = [productId, userId, true, 1, false, queryResulta.rows[0]["price"], false];

                        // execute query
                        dbPool.query(queryString, values, (error, queryResult) => {
                              // invoke callback function with results after query has executed
                              callback(error, queryResult);
                        });
                  })
            },

            getUserCart: (userId, callback) => {
                  //declare queryString
                  let queryString = "SELECT orders.completedorder, orders.price, orders.quantity, orders.products_id, products.name FROM products INNER JOIN orders ON (orders.products_id = products.id) WHERE orders.users_id = $1 AND orders.is_deleted = false AND orders.completedorder = false";
                  let values = [userId];

                  // execute query
                  dbPool.query(queryString, values, (error, queryResult) => {
                        // invoke callback function with results after query has executed
                        callback(error, queryResult);
                  });
            },

            clearCart: (userId, callback) => {
                  let queryString = "UPDATE orders SET incart = false WHERE incart = true"

                  dbPool.query(queryString, (error, queryResult) => {
                        callback(error, queryResult);
                  })
            }
      }
};