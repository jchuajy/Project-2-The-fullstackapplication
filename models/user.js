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
                        let queryString = 'INSERT INTO users (name, email, password, usertype) VALUES ($1, $2, $3, $4)';
                        let values = [
                              user.username,
                              user.email,
                              hashed,
                              "user"
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

                        //declares a usernameCheck to let controller know what kind of response it should send
                        let usernameCheck = false;
                        //declares the password check in order to pass the parameter to callback
                        let passwordCheck = false;
                        let userType = "";
                        let userName= "";

                        if (queryResult.rows.length < 1) {
                              callback(err, queryResult, usernameCheck, passwordCheck, userType, userName);
                              return;
                        }
                        bcrypt.compare(user.password, queryResult.rows[0].password, (err2, res) => {
                              if (res) {
                                    const usernameCheck = true;
                                    const passwordCheck = true;
                                    
                                    //check for userType, username
                                    userType = queryResult.rows[0].usertype;
                                    userName = queryResult.rows[0].name;

                                    callback(err, queryResult, usernameCheck, passwordCheck, userType, userName);

                              } else {
                                    const usernameCheck = true;

                                    callback(err, queryResult, usernameCheck, passwordCheck, userType, userName);
                              };
                        });
                  });
            }





      };
};