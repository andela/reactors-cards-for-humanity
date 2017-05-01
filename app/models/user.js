<<<<<<< HEAD
<<<<<<< HEAD
=======
/* eslint no-underscore-dangle: ["error", { "allow": ["_password"]}]*/
/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

>>>>>>> [Feature #143412449] Lint files contollers/users.js models/user.js and passport.js
// Module dependencies.
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcryptjs'),
  authTypes = ['github', 'twitter', 'facebook', 'google'];
<<<<<<< HEAD
  // const jwt = require('jsonwebtoken');
    // MY_SECRET = require('../../apiproperties');
=======
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    _ = require('underscore'),
    authTypes = ['github', 'twitter', 'facebook', 'google'],
    jwt = require('jsonwebtoken');
    MY_SECRET = require('../../apiproperties');
>>>>>>> [JWT-login #143412449] Generate JWT token

=======
>>>>>>> [Feature #143412449] Lint files contollers/users.js models/user.js and passport.js

// User Schema
const UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  provider: String,
  avatar: String,
  premium: Number, // null or 0 for non-donors, 1 for everyone else (for now)
  donations: [],
  hashedPassword: String,
  facebook: {},
  twitter: {},
  github: {},
  google: {}
});

// Virtuals
UserSchema.virtual('password').set((password) => {
  this._password = password;
  this.hashedPassword = this.encryptPassword(password);
}).get(() => this._password);

// Validations
const validatePresenceOf = value => value && value.length;

// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('name').validate((name) => {
    // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate((email) => {
    // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('username').validate((username) => {
    // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashedPassword').validate((hashedPassword) => {
    // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return hashedPassword.length;
}, 'Password cannot be blank');


// Pre-save hook
UserSchema.pre('save', (next) => {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
    next(new Error('Invalid password'));
  } else { next(); }
});

// Methods
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean} comparison of plainText and hashed password
     * @api public
     */
<<<<<<< HEAD
  authenticate(plainText) {
    if (!plainText || !this.hashedPassword) {
      return false;
    }
    return bcrypt.compareSync(plainText, this.hashedPassword);
  },
=======
    authenticate: function(plainText) {
        if (!plainText || !this.hashed_password) {
            return false;
        }
        if (bcrypt.compareSync(plainText,this.hashed_password)) {
            this.generateJwt();
            return true;
        }
        return false;
    },
>>>>>>> [JWT-login #143412449] Generate JWT token

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String} hashed password
     * @api public
     */
<<<<<<< HEAD
  encryptPassword(password) {
    if (!password) return '';
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
<<<<<<< HEAD
=======
    encryptPassword: function(password) {
        if (!password) return '';
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },

    generateJwt: function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
            _id: this._id,
            // email: this.email,
            // name: this.name,
            exp: parseInt(expiry.getTime() / 1000),
        },      'jndvfeufNNoiwjdsadnowijd');
    }
>>>>>>> [JWT-login #143412449] Generate JWT token
=======
>>>>>>> [JWT-login #143412449] Update path and method to add jwt token on successful signin
};

mongoose.model('User', UserSchema);
