
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
//const donationFormController = require('../controllers/donationpageform');


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
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
router.get('/login', loginController.loginform);

router.post('/login/password', dashboardController.dashboardcont);
//router.get('/donationform', donationFormController.donationPageCont);
router.get('/createpage', pageController.createPageCont);


router.get('/about',function(req,res){
  res.render('about');
})
router.get('/faculties',function(req,res){
  res.render('faculties');
})


router.get('/signup', signupController.signUpCont);
router.post('/signup/alumni', userController.signup);
router.get('/about', function (req, res) {
  res.render('about');
})
router.get('/faculties', function (req, res) {
  res.render('faculties');
})
router.get('/academic', function (req, res) {
  res.render('academic');
})
router.get('/donate', function (req, res) {
  res.render('donate');
})
router.get('/alumni', function (req, res) {
  res.render('alumni');
})
router.get('/contact', function (req, res) {
  res.render('contact');
})
module.exports = router;
