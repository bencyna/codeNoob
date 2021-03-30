const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("../models");
const User = connection.User;

passport.use('local',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done)=> {
    var user = await User.findOne(
      { where: {
          email: email
        }
      });
    if (user == null) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));


passport.serializeUser(function(user, done) {
    done(null, {id: user.id, email: user.email});
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, {id: user.id, email: user.email});
  });

module.exports = passport;  