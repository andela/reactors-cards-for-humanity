<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
// Module dependencies.
const users = require('../app/controllers/users'),
  answers = require('../app/controllers/answers'),
  questions = require('../app/controllers/questions'),
  avatars = require('../app/controllers/avatars'),
  index = require('../app/controllers/index');

module.exports = (app, passport) => {
  // User Routes
<<<<<<< HEAD
=======
const async = require('async');

module.exports = function (app, passport, auth) {
    // User Routes
  const users = require('../app/controllers/users');
<<<<<<< HEAD
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======

>>>>>>> [JWT-login #143412449] Update path and method to add jwt token on successful signin
=======
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
  app.get('/signin', users.signin);
  app.get('/signup', users.signup);
  app.get('/chooseavatars', users.checkAvatar);
  app.get('/signout', users.signout);

<<<<<<< HEAD
<<<<<<< HEAD
  // Setting up the users api
  app.post('/users', users.create);
  app.post('/users/avatars', users.avatars);

  // Donation Routes
=======
    // Setting up the users api
  app.post('/users', users.create);
  app.post('/users/avatars', users.avatars);

    // Donation Routes
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
  // Setting up the users api
  app.post('/users', users.create);
  app.post('/users/avatars', users.avatars);

  // Donation Routes
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
  app.post('/donations', users.addDonation);

  app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: 'Invalid email or password.'
  }), users.session);

  app.get('/users/me', users.me);
  app.get('/users/:userId', users.show);

<<<<<<< HEAD
<<<<<<< HEAD
  // Setting the facebook oauth routes
=======
    // Setting the facebook oauth routes
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
  // Setting the facebook oauth routes
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email'],
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }), users.authCallback);

<<<<<<< HEAD
<<<<<<< HEAD
  // Setting the github oauth routes
=======
    // Setting the github oauth routes
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
  // Setting the github oauth routes
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
  app.get('/auth/github', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), users.authCallback);

<<<<<<< HEAD
<<<<<<< HEAD
  // Setting the twitter oauth routes
=======
    // Setting the twitter oauth routes
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
  // Setting the twitter oauth routes
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
  app.get('/auth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), users.authCallback);

<<<<<<< HEAD
<<<<<<< HEAD
  // Setting the google oauth routes
=======
    // Setting the google oauth routes
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
  // Setting the google oauth routes
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
  app.get('/auth/google', passport.authenticate('google', {
    failureRedirect: '/signin',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }), users.signin);

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin'
  }), users.authCallback);

<<<<<<< HEAD
<<<<<<< HEAD
  // Finish with setting up the userId param
  app.param('userId', users.user);

  // Answer Routes
  app.get('/answers', answers.all);
  app.get('/answers/:answerId', answers.show);

  // Finish with setting up the answerId param
  app.param('answerId', answers.answer);

  // Question Routes
  app.get('/questions', questions.all);
  app.get('/questions/:questionId', questions.show);

  // Finish with setting up the questionId param
  app.param('questionId', questions.question);

  // Avatar Routes
  app.get('/avatars', avatars.allJSON);

  // Home route
  app.get('/play', index.play);
  app.get('/', index.render);

  // Attach token login route
  app.post('/api/auth/login', users.loginWithEmail);
=======
    // Finish with setting up the userId param
=======
  // Finish with setting up the userId param
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
  app.param('userId', users.user);

  // Answer Routes
  app.get('/answers', answers.all);
  app.get('/answers/:answerId', answers.show);

  // Finish with setting up the answerId param
  app.param('answerId', answers.answer);

  // Question Routes
  app.get('/questions', questions.all);
  app.get('/questions/:questionId', questions.show);

  // Finish with setting up the questionId param
  app.param('questionId', questions.question);

  // Avatar Routes
  app.get('/avatars', avatars.allJSON);

  // Home route
  app.get('/play', index.play);
  app.get('/', index.render);

<<<<<<< HEAD
<<<<<<< HEAD
  app.post('/signin', users.loginWithEmail);
>>>>>>> [JWT-login #143412449] Lint files and add method for token attachment to users.js
=======
  // Attach Login token route
  app.post('/api/auth/login', users.loginWithEmail);
  // app.post('/api/auth/signup', users.loginWithEmail);
>>>>>>> [JWT-login #143412449] Update path and method to add jwt token on successful signin
=======
  // Attach token login route
  app.post('/api/auth/login', users.loginWithEmail);
>>>>>>> [JWT-login #143412449] Lint, restructure and add comments to routes.js . Replace JSDOC with comment in users.js
};
