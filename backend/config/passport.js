import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

dotenv.config();

// Passport Serialize and Deserialize User
// For session-based auth (if ever needed), though we'll primarily return JWTs
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await Admin.findById(id);
        if (!user) user = await Doctor.findById(id);
        if (!user) user = await Patient.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/api/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user exists via Google ID in any collection
                    let user = await Admin.findOne({ googleId: profile.id });
                    if (!user) user = await Doctor.findOne({ googleId: profile.id });
                    if (!user) user = await Patient.findOne({ googleId: profile.id });

                    if (!user) {
                        // Check if user exists via email
                        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
                        if (email) {
                            user = await Admin.findOne({ email });
                            if (!user) user = await Doctor.findOne({ email });
                            if (!user) user = await Patient.findOne({ email });
                        }

                        if (user) {
                            // Update existing user with Google ID
                            user.googleId = profile.id;
                            await user.save();
                        } else {
                            // Create new user (defaulting to Patient for OAuth)
                            user = await Patient.create({
                                name: profile.displayName,
                                email: email || `${profile.id}@google.placeholder.com`,
                                googleId: profile.id,
                                role: 'patient'
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

// Facebook Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: '/api/auth/facebook/callback',
                profileFields: ['id', 'displayName', 'emails'],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user exists via Facebook ID
                    let user = await Admin.findOne({ facebookId: profile.id });
                    if (!user) user = await Doctor.findOne({ facebookId: profile.id });
                    if (!user) user = await Patient.findOne({ facebookId: profile.id });

                    if (!user) {
                        // Check if user exists via email
                        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
                        if (email) {
                            user = await Admin.findOne({ email });
                            if (!user) user = await Doctor.findOne({ email });
                            if (!user) user = await Patient.findOne({ email });
                        }

                        if (user) {
                            // Update existing user with Facebook ID
                            user.facebookId = profile.id;
                            await user.save();
                        } else {
                            // Create new user (defaulting to Patient for OAuth)
                            user = await Patient.create({
                                name: profile.displayName,
                                email: email || `${profile.id}@facebook.placeholder.com`,
                                facebookId: profile.id,
                                role: 'patient'
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
