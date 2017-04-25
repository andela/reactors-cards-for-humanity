<<<<<<< HEAD
/* global next:true*/
/* eslint no-undef: "error"*/
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"]}]*/
/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

// Module dependencies.
const mongoose = require('mongoose');

const User = mongoose.model('User');
const avatars = require('./avatars').all();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

// Auth callback
exports.authCallback = (req, res) => {
=======
/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const User = mongoose.model('User');
const avatars = require('./avatars').all();
const jwt = require('jsonwebtoken');
  // _ = require('_underscore');
const secretKey = process.env.SECRET_KEY;

// Auth callback
exports.authCallback = function (req, res, next) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
  res.redirect('/chooseavatars');
};

// Show login form
<<<<<<< HEAD
exports.signin = (req, res) => {
=======
exports.signin = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
  if (!req.user) {
    res.redirect('/#!/signin?error=invalid');
  } else {
    res.redirect('/#!/app');
  }
};

// Show sign up form
<<<<<<< HEAD
exports.signup = (req, res) => {
=======
exports.signup = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
  if (!req.user) {
    res.redirect('/#!/signup');
  } else {
    res.redirect('/#!/app');
  }
};

// Logout
<<<<<<< HEAD
exports.signout = (req, res) => {
=======
exports.signout = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
  req.logout();
  res.redirect('/');
};

// Session
<<<<<<< HEAD
exports.session = (req, res) => {
=======

exports.session = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
  res.redirect('/');
};

/*
 * Check avatar - Confirm if the user who logged in via passport
 * already has an avatar. If they don't have one, redirect them
 * to our Choose an Avatar page.
 */
<<<<<<< HEAD
exports.checkAvatar = (req, res) => {
=======
exports.checkAvatar = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
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
// Create user
exports.create = (req, res) => {
=======
/**
 * Create user
 */
exports.create = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
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
// Assign avatar to user
exports.avatars = (req, res) => {
=======
/**
 * Assign avatar to user
 */
exports.avatars = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
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
exports.addDonation = (req, res) => {
=======
exports.addDonation = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
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
        for (let i = 0; i < user.donations.length; i += 1) {
=======
        for (let i = 0; i < user.donations.length; i++) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
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
// Show user profile
exports.show = (req, res) => {
=======
// Show profile
exports.show = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
  const user = req.profile;

  res.render('users/show', {
    title: user.name,
    user
  });
};

// Send User
<<<<<<< HEAD
exports.me = (req, res) => {
=======
exports.me = function (req, res) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
  res.jsonp(req.user || null);
};

// Find user by id
<<<<<<< HEAD
exports.user = (req, res, next, id) => {
=======
exports.user = function (req, res, next, id) {
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
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
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
      const token = jwt.sign(user._id, secretKey, {
        expiresIn: '24h'
      });
      user.password = null;
      res.status(200).json(Object.assign({}, user._id, user.name, user.email, { token }));
>>>>>>> [JWT-login #143412449] Update path and method to add jwt token on successful signin
    });
};
