const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../models');

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
});

module.exports = passport;
