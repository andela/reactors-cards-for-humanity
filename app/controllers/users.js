/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const avatars = require('./avatars').all();

const secretKey = 'hello';
// Auth callback
exports.authCallback = (req, res, next) => {
  res.redirect('/chooseavatars');
};

// Show login form
exports.signin = (req, res) => {
  if (!req.user) {
    res.redirect('/#!/signin?error=invalid');
  } else {
    res.redirect('/#!/app');
  }
};


// Show sign up form
exports.signup = (req, res) => {
  if (!req.user) {
    res.redirect('/#!/signup');
  } else {
    res.redirect('/#!/app');
  }
};

// Logout

exports.signout = (req, res) => {
  req.logout();
  res.redirect('/');
};

// Session
exports.session = (req, res) => {
  res.redirect('/');
};


// Check avatar - Confirm if the user who logged in via passport |
// already has an avatar. If they don't have one, redirect them |
// to our Choose an Avatar page.
exports.checkAvatar = (req, res) => {
  if (req.user && req.user._id) {
    User.findOne({
      _id: req.user._id
    })
      .exec((err, user) => {
        if (user.avatar !== undefined) {
          res.redirect('/#!/');
        } else {
          res.redirect('/#!/choose-avatar');
        }
      });
  } else {
    // If user doesn't even exist, redirect to /
    res.redirect('/');
  }
};

// Create user
exports.create = (req, res) => {
  if (req.body.name && req.body.password && req.body.email) {
    User.findOne({
      email: req.body.email
    }).exec((err, existingUser) => {
      if (!existingUser) {
        const user = new User(req.body);
        // Switch the user's avatar index to an actual avatar url
        user.avatar = avatars[user.avatar];
        user.provider = 'local';
        user.save((err) => {
          if (err) {
            return res.render('/#!/signup?error=unknown', {
              errors: err.errors,
              user
            });
          }

          req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/#!/');
          });
        });
      } else {
        return res.redirect('/#!/signup?error=existinguser');
      }
    });
  } else {
    return res.redirect('/#!/signup?error=incomplete');
  }
};

// Assign avatar to user
exports.avatars = (req, res) => {
  // Update the current user's profile to include the avatar choice they've made
  if (req.user && req.user._id && req.body.avatar !== undefined &&
    /\d/.test(req.body.avatar) && avatars[req.body.avatar]) {
    User.findOne({
      _id: req.user._id
    })
      .exec((err, user) => {
        user.avatar = avatars[req.body.avatar];
        user.save();
      });
  }
  return res.redirect('/#!/app');
};

exports.addDonation = (req, res) => {
  if (req.body && req.user && req.user._id) {
    // Verify that the object contains crowdrise data
    if (req.body.amount && req.body.crowdrise_donation_id && req.body.donor_name) {
      User.findOne({
        _id: req.user._id
      })
        .exec((err, user) => {
          // Confirm that this object hasn't already been entered
          let duplicate = false;
          for (let i = 0; i < user.donations.length; i++) {
            if (user.donations[i].crowdrise_donation_id === req.body.crowdrise_donation_id) {
              duplicate = true;
            }
          }
          if (!duplicate) {
            console.log('Validated donation');
            user.donations.push(req.body);
            user.premium = 1;
            user.save();
          }
        });
    }
  }
  res.send();
};


// Show profile
exports.show = (req, res) => {
  const user = req.profile;

  res.render('users/show', {
    title: user.name,
    user
  });
};

// Send User
exports.me = (req, res) => {
  res.jsonp(req.user || null);
};

// Find user by id
exports.user = (req, res, next, id) => {
  User
    .findOne({
      _id: id
    })
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error(`Failed to load User ${id}`));
      req.profile = user;
      next();
    });
};

exports.signUpWithJWT = (req, res) => {
  if (req.body.name && req.body.password && req.body.email) {
    User.findOne({
      email: req.body.email
    }).exec((err, existingUser) => {
      if (!existingUser) {
        const user = new User(req.body);
          // Switch the user's avatar index to an actual avatar url
        user.avatar = avatars[user.avatar];
        user.provider = 'jwt';
        user.save((err) => {
          if (err) {
            return res.status(400).json({ message: 'Could not create user' });
          }
          const token = jwt.sign({ data: user._id }, secretKey, {
            expiresIn: 60 * 60
          });

            // Send token
          res.status(200).json(Object.assign({},
        { id: user.id, name: user.name, email: user.email }, { token }));
        });
      } else {
        return res.status(401).json({ message: 'Existing User' });
      }
    });
  } else {
    return res.status(401).json({ message: 'Name, email and password are required' });
  }
};
exports.loginWithJWT = (req, res) => {
    // Check if the email and passord fields are empty
  if (req.body.email === '' || req.body.password === '') {
    return res.status(401).json({ message: 'The email and password fields cannot be empty' });
  } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
      // Check that the correct password format is entered
    return res.status(401).json({ message: 'Please enter a valid email format' });
  }
  User
      .findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        if (!user.authenticate(req.body.password)) {
          return res.status(401).json({
            message: 'Invalid password'
          });
        }
        // Generate and assign token to authenticated user
        const token = jwt.sign({ data: user._id }, secretKey, {
          expiresIn: 60 * 60
        });
        // Send token
        user.password = null;
        res.status(200).json(Object.assign({},
        { id: user.id, name: user.name, email: user.email }, { token }));
      });
};
