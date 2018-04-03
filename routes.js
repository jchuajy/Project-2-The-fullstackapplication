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
      app.post('/users/logout', users.logoutUser);

      //Products CRUD
      app.get("/products", products.showAllProducts(db));
      app.get("/products/new", products.goToProductCreation);
      app.post("/products/new", products.saveNewProduct(db));
      app.get("/products/:id/edit", products.goToEditProductById(db));
      app.put("/products/:id", products.saveProductEdits(db));
      app.get("/products/:id", products.goToProductById(db));
}