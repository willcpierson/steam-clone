const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('./keys');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');

// login with username and password combination
passport.use(new LocalStrategy({
  session: false,
  usernameField: 'email',
  passwordField: 'password',
}, async function (email, password, done) {
  const user = await User.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
      if (err || !isMatch) done(null, false);
      else done(null, user);
    });
  } else
    done(null, false);
}));


exports.loginUser = async function(user) {
  const userInfo = {
    _id: user._id,
    username: user.username,
    email: user.email
  };
  const token = await jwt.sign(
    userInfo, // Payload
    secretOrKey, // Sign with secret key
    { expiresIn: 3600 } // key expires in 1 hour
  );
  return {
    user: userInfo,
    token
  };
};

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

//authentication after initial log-in/sign-up
passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id)
    if (user) {
      // return the user to the frontend
      return done(null, user);
    }
    // return false since there is no user
    return done(null, false);
  }
  catch(err) {
    done(err);
  }
}));

// requires user to be logged in for whatever action to occur
exports.requireUser = passport.authenticate('jwt', { session: false });

// Same as above, but no error if there is no user
exports.restoreUser = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, function(err, user) {
    if (user) req.user = user;
    next();
  })(req, res, next);
};