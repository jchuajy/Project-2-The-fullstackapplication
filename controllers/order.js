/**
 * Order controller functions.
 *
 * Each user-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */


/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

const addToCartById = (db) => {
      return (request, response) => {
            // use order model method "addToCartById" to save new product into db
            db.orderDB.addToCartById(request.params.productid, request.cookies["username"], (error, queryResult) => {
                  //send a response (can be anything)
                  response.status(200);
            });
      };
};


module.exports = {
      addToCartById
};