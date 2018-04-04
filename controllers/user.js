/**
 * User controller functions.
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
const newUserForm = (request, response) => {
      response.render('user/newUser');
};

const createNewUser = (db) => {
      return (request, response) => {
            // use user model method "createNewUser" to create new user entry in db
            db.userDB.createNewUser(request.body, (error, queryResult) => {
                  // queryResult of creation is not useful to us, so we ignore it
                  // (console log it to see for yourself)
                  // (you can choose to omit it completely from the function parameters)

                  if (error) {
                        console.error('error getting pokemon:', error);
                        response.sendStatus(500);
                  }

                  if (queryResult.rowCount >= 1) {
                        console.log(queryResult);
                        console.log('User created successfully');

                        // drop cookies to indicate user's logged in status and username
                        response.cookie('loggedIn', true);
                        response.cookie('username', request.body.name);
                  } else {
                        console.log('User could not be created');
                  }

                  // redirect to home page after creation
                  response.redirect('/');
            });
      };
};

const goToLogin = (request, response) => {
      response.render("user/login");
};

const loginUser = (db) => {
      return (request, response) => {
            //use user model method "findLogin" to check if user information is stored on db
            db.userDB.findLogin(request.body, (error, queryResult, usernameCheck, passwordCheck, userType, userName) => {
                  //error logs
                  if (error) {
                        console.error('error logging in:', error);
                        response.sendStatus(500);
                  }
                  //if usernameCheck fails
                  if (usernameCheck === false) {

                        console.log("No username found!");
                        response.redirect("/users/login")
                        //if passwordCheck fails
                  } else if (passwordCheck === false) {
                        console.log("Wrong password!");
                        response.redirect("/users/login")
                  } else {
                        //if both check passes
                        console.log('User found!');

                        // drop cookies to indicate user's logged in status and username
                        response.cookie('loggedIn', true);
                        response.cookie('username', userName);
                        response.cookie("userType", userType)
                        // redirect to home page after creation
                        response.redirect('/');
                  };
            });
      };
};

const logoutUser = (request, response) => {
      //change cookie values
      response.cookie('loggedIn', false);
      response.cookie('username', "none");
      response.cookie("userType", "none");
      // redirect to home page after creation
      response.redirect('/');
}

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
      newUserForm,
      createNewUser,
      goToLogin,
      loginUser,
      logoutUser
}