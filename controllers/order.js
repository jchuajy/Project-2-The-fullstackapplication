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
            db.orderDB.addToCartById(request.params.productid, request.cookies["userId"], (error, queryResult) => {
                  //send a response (can be anything)
                  response.status(200);
            });
      };
};

const getUserCart = (db) => {
      return (request, response) => {
            // use order model method "getUserCart" to save new product into db
            db.orderDB.getUserCart(request.cookies["userId"], (error, queryResult) => {
                  let totalPrice = 0;
                  for (let i = 0; i < queryResult.rows.length; i++) {

                        totalPrice = totalPrice + parseFloat(queryResult.rows[i]["price"]);
                  }
                  //send a response (can be anything)
                  let context = {
                        cartItems: queryResult.rows,
                        totalPrice: totalPrice.toFixed(2),
                        paidPrice: totalPrice.toFixed(2) * 100
                  };
                  response.render("order/mycart", context);
            });
      };
};

const paySuccess = (db) => {
      return (request, response) => {
            db.orderDB.clearCart(request.cookies["userId"], (error, queryResult) => {

                  response.render("order/paysuccess")
            })
      }
} 


module.exports = {
      addToCartById,
      getUserCart,
      paySuccess
};