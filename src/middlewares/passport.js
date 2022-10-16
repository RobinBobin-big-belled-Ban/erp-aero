import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from '../config.js';
import { db } from '../settings/db.js';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtKey,
};

export const linkJwtPassport = (passport) => {
    passport.use(
        new Strategy(options, (payload, done) => {
            try {
                const sql = "SELECT `id`, `email` FROM `users` WHERE `id` = '" + payload.id + "'";

                db.query(sql, (error, rows, field) => {
                    if (error) {
                        return done(err, false);
                    } else {
                        if (rows) {
                            return done(null, rows);
                        } else {
                            return done(null, false);
                        }
                    }
                })
            } catch (err) {
                console.log(err);
            }
        })
    );
}