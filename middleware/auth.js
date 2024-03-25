const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const  SECRET_KEY  = "myjwtdevicesecret"
const User = require('../model/User'); 

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const jwtAuthMiddleware = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if (!user) {
      return done(null, false, { message: 'Invalid token: User not found' });
    }

    // You may add additional checks here based on your requirements

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use('jwt', jwtAuthMiddleware);

const authMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // You can attach the user object to the request for later use
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = authMiddleware;
