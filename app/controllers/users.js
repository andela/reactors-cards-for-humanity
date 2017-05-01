<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
/* global next:true*/
/* eslint no-undef: "error"*/
=======

>>>>>>> [JWT-login #143412449] Update package.json and add new check for empty  credential entries on users.js
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"]}]*/
/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

<<<<<<< HEAD
<<<<<<< HEAD
// Module dependencies.
const mongoose = require('mongoose'),

  User = mongoose.model('User'),
  avatars = require('./avatars').all(),
  jwt = require('jsonwebtoken'),
  secretKey = process.env.SECRET_KEY;

// Auth callback
exports.authCallback = (req, res) => {
=======
=======
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
/**
 * Module dependencies.
 */
=======
// Module dependencies.
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
const mongoose = require('mongoose');

const User = mongoose.model('User');
const avatars = require('./avatars').all();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

// Auth callback
<<<<<<< HEAD
exports.authCallback = function (req, res, next) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
exports.authCallback = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
  res.redirect('/chooseavatars');
};

// Show login form
<<<<<<< HEAD
<<<<<<< HEAD
exports.signin = (req, res) => {
=======
exports.signin = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
exports.signin = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
  if (!req.user) {
    res.redirect('/#!/signin?error=invalid');
  } else {
    res.redirect('/#!/app');
  }
};

// Show sign up form
<<<<<<< HEAD
<<<<<<< HEAD
exports.signup = (req, res) => {
=======
exports.signup = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
exports.signup = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
  if (!req.user) {
    res.redirect('/#!/signup');
  } else {
    res.redirect('/#!/app');
  }
};

// Logout
<<<<<<< HEAD
<<<<<<< HEAD
exports.signout = (req, res) => {
=======
exports.signout = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
exports.signout = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
  req.logout();
  res.redirect('/');
};

// Session
<<<<<<< HEAD
<<<<<<< HEAD
exports.session = (req, res) => {
=======

exports.session = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
exports.session = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
  res.redirect('/');
};

/*
 * Check avatar - Confirm if the user who logged in via passport
 * already has an avatar. If they don't have one, redirect them
 * to our Choose an Avatar page.
 */
<<<<<<< HEAD
<<<<<<< HEAD
exports.checkAvatar = (req, res) => {
=======
exports.checkAvatar = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
exports.checkAvatar = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
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

<<<<<<< HEAD
<<<<<<< HEAD
// Create user
exports.create = (req, res) => {
=======
/**
 * Create user
 */
exports.create = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
// Create user
<<<<<<< HEAD
exports.create = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
=======
exports.create = (req, res, next) => {
>>>>>>> [JWT-login #143412449] Update package.json and add new check for empty  credential entries on users.js
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

<<<<<<< HEAD
<<<<<<< HEAD
// Assign avatar to user
exports.avatars = (req, res) => {
=======
/**
 * Assign avatar to user
 */
exports.avatars = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
// Assign avatar to user
exports.avatars = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
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

<<<<<<< HEAD
<<<<<<< HEAD
exports.addDonation = (req, res) => {
=======
exports.addDonation = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
exports.addDonation = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
  if (req.body && req.user && req.user._id) {
    // Verify that the object contains crowdrise data
    if (req.body.amount && req.body.crowdrise_donation_id && req.body.donor_name) {
      User.findOne({
        _id: req.user._id
      })
      .exec((err, user) => {
        // Confirm that this object hasn't already been entered
        let duplicate = false;
<<<<<<< HEAD
<<<<<<< HEAD
        for (let i = 0; i < user.donations.length; i += 1) {
=======
        for (let i = 0; i < user.donations.length; i++) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
        for (let i = 0; i < user.donations.length; i += 1) {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
          if (user.donations[i].crowdrise_donation_id === req.body.crowdrise_donation_id) {
            duplicate = true;
          }
        }
        if (!duplicate) {
          user.donations.push(req.body);
          user.premium = 1;
          user.save();
        }
      });
    }
  }
  res.send();
};

<<<<<<< HEAD
<<<<<<< HEAD
// Show user profile
exports.show = (req, res) => {
=======
// Show profile
exports.show = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
// Show user profile
exports.show = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
  const user = req.profile;

  res.render('users/show', {
    title: user.name,
    user
  });
};

// Send User
<<<<<<< HEAD
<<<<<<< HEAD
exports.me = (req, res) => {
=======
exports.me = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
exports.me = (req, res) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
  res.jsonp(req.user || null);
};

// Find user by id
<<<<<<< HEAD
<<<<<<< HEAD
exports.user = (req, res, next, id) => {
=======
exports.user = function (req, res, next, id) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
exports.user = (req, res, next, id) => {
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
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

<<<<<<< HEAD
<<<<<<< HEAD
 // Attach token to user credentials after authentication
exports.loginWithEmail = (req, res) => {
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
      const token = jwt.sign(user._id, secretKey, {
        expiresIn: '24h'
      });
      user.password = null;
      res.status(200).json(Object.assign({}, user._id, user.name, user.email, { token }));
=======
exports.loginWithEmail = function (req, res) {
  // get the user credentials from form  req.body.password
  // req.body.email
=======
 // Attach token to user credentials after authentication
exports.loginWithEmail = (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> [JWT-login #143412449] Correct style errors using ESLint. Add exceptions and comments on users.js
=======
=======
  // Check if the email and passord fields are empty
>>>>>>> [Feature #143412449] Lint files contollers/users.js models/user.js and passport.js
  if (req.body.email === '' || req.body.password === '') {
    return res.status(401).json({ message: 'The email and password fields cannot be empty' });
  } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
    // Check that the correct password format is entered
    return res.status(401).json({ message: 'Please enter a valid email format' });
  }
>>>>>>> [JWT-login #143412449] Update package.json and add new check for empty  credential entries on users.js
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
=======
      // Generate and assign token to authenticated user
>>>>>>> [Feature #143412449] Lint files contollers/users.js models/user.js and passport.js
      const token = jwt.sign(user._id, secretKey, {
        expiresIn: '24h'
      });
      // Send token
      user.password = null;
      res.status(200).json(Object.assign({}, user._id, user.name, user.email, { token }));
>>>>>>> [JWT-login #143412449] Update path and method to add jwt token on successful signin
    });
};
