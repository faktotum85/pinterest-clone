const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  require('./strategies/twitter.js') ();
}
