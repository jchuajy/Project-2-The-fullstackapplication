/**
 * Product model functions.
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

const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPool) => {
      return {
            showAllProducts: (user, callback) => {
                  let queryString = "";
                  switch (user) {
                        case "hot":
                              console.log("hot out here");
                              break;

                        default:
                              //declare queryString
                              queryString = "SELECT * FROM products";
                  }

                  // execute query
                  dbPool.query(queryString, (error, queryResult) => {
                        // invoke callback function with results after query has executed
                        callback(error, queryResult);
                  });
            },

            saveNewProduct: (user, callback) => {
                  //declare queryString
                  let queryString = "INSERT INTO products (name, colour, img, description, price, quantity) VALUES ($1, $2, $3, $4,$5, $6)";
                  let values = [user.name, user.colour, user.img, user.description, user.price, user.quantity];
                  // execute query
                  dbPool.query(queryString, values, (error, queryResult) => {
                        // invoke callback function with results after query has executed
                        callback(error, queryResult);
                  });
            },

            goToProductById: (user, callback) => {
                  //declare queryString
                  let queryString = "SELECT * FROM products WHERE id = $1";
                  let values = [user];
                  // execute query
                  dbPool.query(queryString, values, (error, queryResult) => {
                        // invoke callback function with results after query has executed
                        callback(error, queryResult);
                  });
            },

            saveProductEdits: (requestId, requestBody, callback) => {
                  //declare queryString
                  let queryString = "UPDATE products SET name= $1, colour = $2, img = $3, description = $4, price = $5, quantity = $6 WHERE id = " + requestId;
                  let values = [requestBody.name, requestBody.colour, requestBody.img, requestBody.description, requestBody.price, requestBody.quantity];
                  // execute query
                  dbPool.query(queryString, values, (error, queryResult) => {
                        // invoke callback function with results after query has executed
                        callback(error, queryResult);
                  });
            }

      }
}