import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});


if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/api/auth/google/callback',
                passReqToCallback: true,
            },
            async (req, accessToken, refreshToken, profile, done) => {
                try {
                    const role = req.query.state || 'Patient';

                    let user = await User.findOne({ googleId: profile.id });

                    if (!user) {

                        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
                        if (email) {
                            user = await User.findOne({ email });
                        }

                        if (user) {

                            user.googleId = profile.id;
                            await user.save();
                        } else {

                            user = await User.create({
                                name: profile.displayName,
                                email: email || `${profile.id}@google.placeholder.com`,
                                googleId: profile.id,
                                role: role
                            });
                        }
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );
}


if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: '/api/auth/facebook/callback',
                profileFields: ['id', 'displayName', 'emails'],
                passReqToCallback: true,
            },
            async (req, accessToken, refreshToken, profile, done) => {
                try {
                    const role = req.query.state || 'Patient';

                    let user = await User.findOne({ facebookId: profile.id });

                    if (!user) {

                        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
                        if (email) {
                            user = await User.findOne({ email });
                        }

                        if (user) {

                            user.facebookId = profile.id;
                            await user.save();
                        } else {

                            user = await User.create({
                                name: profile.displayName,
                                email: email || `${profile.id}@facebook.placeholder.com`,
                                facebookId: profile.id,
                                role: role
                            });
                        }
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );
}

export default passport;
