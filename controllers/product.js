/**
 * Product controller functions.
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

const showAllProducts = (db) => {
      return (request, response) => {
            // use product model method "showAllProducts" to retrieve all products from db
            db.productDB.showAllProducts(request.query.sortby, (error, queryResult) => {
                  let context = {
                        product: queryResult.rows
                  };
                  response.render("product/allProducts", context);
            });
      };
};

const goToProductCreation = (request, response) => {

      response.render("product/newProduct");
};

const saveNewProduct = (db) => {
      return (request, response) => {
            // use product model method "saveNewProducts" to save new product into db
            db.productDB.saveNewProduct(request.body, (error, queryResult) => {

                  response.redirect("/");
            });
      };
};

const goToProductById = (db) => {
      return (request, response) => {
            // use product model method "goToProductById" to retrieve information from db
            db.productDB.goToProductById(request.params.id, (error, queryResult) => {
                  if (error) console.error("Error getting product!", error);
                  let context = {
                        product: queryResult.rows[0]
                  };

                  response.render("product/product", context);
            });
      };
};

const goToEditProductById = (db) => {
      return (request, response) => {
            // use product model method "goToProductById" to retrieve information from db
            db.productDB.goToProductById(request.params.id, (error, queryResult) => {
                  let context = {
                        product: queryResult.rows[0]
                  };
                  response.render("product/editProduct", context);
            });
      };
};

const saveProductEdits = (db) => {
      return (request, response) => {
            // use product model method "saveProductEdits" to save edits into db
            db.productDB.saveProductEdits(request.params.id, request.body, (error, queryResult) => {
                  
                  response.redirect("/");
            });
      };
};

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
      showAllProducts,
      goToProductCreation,
      saveNewProduct,
      goToProductById,
      goToEditProductById,
      saveProductEdits
}