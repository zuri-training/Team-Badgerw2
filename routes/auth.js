
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
const dashboardController = require('../controllers/dashboard');
const pageController = require('../controllers/createpage');
const donationFormController = require('../controllers/donationpageform');


passport.use(new LocalStrategy({
  usernameField: 'alumni[email]',
  passwordField: 'alumni[password]',
},function verify(email, password, done){
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
passport.serializeUser(function (alumni, done) {

  done(null, { id: alumni.id, username: alumni.username });

});

passport.deserializeUser(function (id, done) {
  alumni.findById(id, function (err, user) {
    done(err, user);
  });
});
function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  res.render("login", {
    message: " ",
    error: "Unauthorised Access"
  });
}
router.get('/flash', function (req, res) {
  req.flash({
    "login-success": "Login Succesful",
    "login-failure": "Login UnSuccesful",
    'register-success': "Registraion successful",
    'register-falure': "Registraion successful",
  });
  res.redirect('/login');
  res.redirect('/signup');
});
router.get('/login', loginController.loginform);

router.post('/login/password', userController.login);
router.get('/donation', isLoggedIn, donationFormController.donationPageCont);
router.get('/createpage', isLoggedIn, pageController.createPageCont);


router.get('/about', function (req, res) {
  res.render('about');

});
router.get('/faculties', function (req, res) {
  res.render('faculties');

});


router.get('/signup', signupController.signUpCont);
router.post('/signup/alumni', userController.signup);

router.get('/dashboard', function (req, res) {
  res.redirect('/login')
});

router.get('/academic', function (req, res) {
  res.render('academic');

});
router.get('/donate', isLoggedIn, function (req, res) {
  res.render('donate');

});
router.get('/alumni', function (req, res) {
  res.render('alumni');

});
router.get('/contact', function (req, res) {
  res.render('contact');

});



router.post('/payment', function (req, res) {
  res.render('payment');
})
router.get('/share', function (req, res) {

  res.render('sharelink')
});

router.get('/logout', function (req, res, next) {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/login')
    })
  })
})
module.exports = router;
