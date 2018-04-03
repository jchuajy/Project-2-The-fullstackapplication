/**
 * User model functions.
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
            createNewUser: (user, callback) => {
                  // run user input password through bcrypt to obtain hashed password
                  bcrypt.hash(user.password, 1, (err, hashed) => {
                        if (err) console.error('error!', err);

                        // set up query
                        let queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
                        let values = [
                              user.username,
                              user.email,
                              hashed
                        ];

                        // execute query
                        dbPool.query(queryString, values, (error, queryResult) => {
                              // invoke callback function with results after query has executed
                              callback(error, queryResult);
                        });
                  });
            },

            findLogin: (user, callback) => {
                  //set queryString
                  let queryString = "SELECT * FROM users WHERE name = $1";
                  let values = [user.username];
                  //run query

                  dbPool.query(queryString, values, (err, queryResult) => {
                        if (err) console.error('error!', err);
                        if (queryResult.rows.length < 1) {
                              //declares a usernameCheck to let controller know what kind of response it should send
                              const usernameCheck = false;
                              //declares the password check in order to pass the parameter to callback
                              const passwordCheck = false;
                              callback(err, queryResult, usernameCheck, passwordCheck);
                              return;
                        }
                        bcrypt.compare(user.password, queryResult.rows[0].password, (err2, res) => {
                              if (res) {
                                    const usernameCheck = true;
                                    const passwordCheck = true;
                                    callback(err, queryResult, usernameCheck, passwordCheck);
                              } else {
                                    const usernameCheck = true;
                                    const passwordCheck = false;
                                    callback(err, queryResult, usernameCheck, passwordCheck);
                              };
                        });
                  });
            }





      };
};