import mongoose = require('mongoose');
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

const User = require('../model/user');

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.TOKENKEY}`
};

/* Middleware use for auth */
export default new Strategy(opts, async (payload, done) => {
    try {

        const user = await User.findById(payload._id);
        if (user) {

            return done(null, user._id);
        }
        return done(null, false);
    } catch (error) {
        console.log(error);
    }
});


