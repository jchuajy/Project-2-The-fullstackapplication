const express = require('express');
const bcrypt = require('bcrypt');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const db = require('./db')
const stripe = require("stripe")("sk_test_KLqq91MyqOtZtu0jk5CPsZva");

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({
      extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(methodOverride('_method'));

//set up public folder for css
app.use(express.static('public'));

// Set handlebars to be the default view engine. using layouts
const handlebarsConfig = {
      extname: '.handlebars',
      layoutsDir: 'views',
      defaultLayout: 'layout'
};

// Set handlebars to be the default view engine
app.engine('.handlebars', handlebars(handlebarsConfig));
app.set('view engine', '.handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

// Import routes to match incoming requests
require('./routes')(app, db);


// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
      let queryString = "SELECT * from products"
      db.pool.query(queryString, (error, queryResult) => {
            if (error) console.error('error!', error);

            let context = {
                  product: queryResult.rows
            };
            response.render("home", context);

      })

});

app.get("/test", (request, response) => {
      response.render("carousel");
})

app.post("/orders/charge", function (req, res) {
      var token = req.body.stripeToken;
      var chargeAmount = req.body.chargeAmount;
      var charge = stripe.charges.create({
            amount: chargeAmount,
            currency: "sgd",
            source: token
      }, function(err, charge) {
            if (err & err.type ==="StripeCardError") {
                  console.log("Your card was declined");
            }
      });
      console.log("Your payment was successful");
      res.redirect("/orders/success");
})

app.get("*", (request, response) => {
      response.render("404");
});

// Catch all unmatched requests and return 404 not found page

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
      console.log('Closed express server');

      // close database connection pool

});