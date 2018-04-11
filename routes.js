/**
 * Routes file.
 *
 * All routes you want to match in the app should appear here.
 * Upon match, a corresponding controller method should be called.
 *
 * Export as a function using `module.exports`,
 * to be imported (using `require(...)`) in `index.js`.
 */
const users = require('./controllers/user')
const products = require('./controllers/product')
const orders = require("./controllers/order")

//create middleware for to perform access control list functionality
const accessControl = function (req, res, next) {
      //if usertype cookie is admin
      if (req.cookies["userType"] == "admin") {
            //go to next middleware
            next();
      } else {
            //redirect to homepage
            res.redirect("/");
      };
};

module.exports = (app, db) => {
      // Users CRUD
      //get new user form
      app.get('/users/new', users.newUserForm);
      //save new user. need to pass db parameter to be able to access database
      app.post('/users/new', users.createNewUser(db));
      //go to login form
      app.get('/users/login', users.goToLogin);
      //log in user
      app.post('/users/login', users.loginUser(db));
      //log out user
      app.get('/users/logout', users.logoutUser);

      //Products CRUD
      app.get("/products", products.showAllProducts(db));
      app.get("/products/new", accessControl, products.goToProductCreation);
      app.post("/products/new", accessControl, products.saveNewProduct(db));
      app.get("/products/:id/edit", accessControl, products.goToEditProductById(db));
      app.put("/products/:id", accessControl, products.saveProductEdits(db));
      app.get("/products/:id", products.goToProductById(db));

      //Orders CRUD
      app.post("/orders/addToCart/:productid", orders.addToCartById(db));
      app.get("/orders/mycart", orders.getUserCart(db));
      app.get("/orders/success", orders.paySuccess(db));

}