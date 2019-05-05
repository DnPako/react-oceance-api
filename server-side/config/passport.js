const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET; //normally store this in process.env.secret

module.exports = new JWTStrategy(opts, async (payload, done) => {
    const user = await mongoose.model('User').findOne({email: payload.email});
    if (user)
        return done(null, true);

    return done(null, false);
});