const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = app => {
  //New User Signup
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const { password, confirmPassword } = body;
    let { email, firstName, lastName } = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    if (password !== confirmPassword) {
      return res.send({
        success: false,
        message: 'Error: Passwords do not match.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();

    if (firstName) {
      firstName = firstName
        .toLowerCase()
        .trim()
        .split('');
      firstName[0] = firstName[0].toUpperCase();
      firstName = firstName.join('');
    }

    if (lastName) {
      lastName = lastName
        .toLowerCase()
        .trim()
        .split('');
      lastName[0] = lastName[0].toUpperCase();
      lastName = lastName.join('');
    }

    // Verify email address has not been used
    User.find({ email: email }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: An account with this email address already exist.'
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.email = email;
      if (firstName) newUser.firstName = firstName;
      if (lastName) newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save(err => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Sign up successful!'
        });
      });
    });
  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: 'Error: No user found with that email address'
          });
        }
        const user = users[0];
        let sessionId = '';
        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            message: 'Error: Incorrect password'
          });
        }
        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: server error'
            });
          }

          return res.send({
            success: true,
            message: 'Valid sign in',
            token: doc._id,
            user: user
          });
        });
      }
    );
  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: {
          isDeleted: true
        }
      },
      null,
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    );
  });

  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: 'Error: Invalid'
          });
        } else {
          // Do action
          User.findById(sessions[0].userId, (err, user) => {
            if (err) {
              res.send({
                success: false,
                message: 'User not found'
              });
            }
            res.send({
              success: true,
              message: 'User found',
              user: user
            });
          });
        }
      }
    );
  });
};
