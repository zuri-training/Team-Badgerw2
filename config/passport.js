const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const alumni = mongoose.model('Alumni');

passport.use(new LocalStrategy({
  usernameField: 'alumni[email]',
  passwordField: 'alumni[password]',
}, (email, password, done) => {
  Alumni.findOne({ email })
    .then((alumni) => {
      if(!alumni || !alumni.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, alumni);
    }).catch(done);
}));
