
var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
var passport = require('passport');
var LocalStrategy = require('passport-local');
//var crypto = require('crypto');
const alumni = require("../models/model").alumni;
const connectToDb = require('../dbConnect');
const userController = require('../controllers/usercontroller');
const loginController = require('../controllers/logincontroller');
const signupController = require('../controllers/signup');

passport.use(new LocalStrategy({
  usernameField: 'alumni[email]',
  passwordField: 'alumni[password]',
}, (email, password, done) => {
  alumni.findOne({ email })
    .then((alumni) => {
      if (!alumni) {
        return done(null, false, { errors: { 'email': 'is invalid' } });
      }
      const match = bcrypt.compare(req.body.password, alumni.password);
      if (!match) {
        return done(null, false, { errors: { 'password': 'is invalid' } });
      }
      return done(null, alumni);
    }).catch(done);
}));


router.get('/login', loginController.loginform);

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/dashbord',
  failureRedirect: '/login'
}));

passport.serializeUser(function (alumni, cb) {
  process.nextTick(function () {
    cb(null, { id: alumni.id, username: alumni.username });
  });
});

passport.deserializeUser(function (alumni, cb) {
  process.nextTick(function () {
    return cb(null, alumni);
  });
});
router.get('/signup', signupController.signUpCont);
router.post('/signup/alumni', userController.signup);
module.exports = router;
