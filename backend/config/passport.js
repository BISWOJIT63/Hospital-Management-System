import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, { id: user.id || user._id, role: user.role || 'Patient' });
});

passport.deserializeUser(async (data, done) => {
    try {
        let user;
        if (data.role === 'Admin' || data.role === 'SuperAdmin') {
            user = await Admin.findById(data.id);
        } else if (data.role === 'Doctor') {
            user = await Doctor.findById(data.id);
        } else {
            user = await Patient.findById(data.id);
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

const findOAuthUser = async (profileId, provider) => {
    const query = provider === 'google' ? { googleId: profileId } : { facebookId: profileId };
    let user = await Admin.findOne(query);
    if (user) return user;
    user = await Doctor.findOne(query);
    if (user) return user;
    user = await Patient.findOne(query);
    return user;
};

const findUserByEmail = async (email) => {
    let user = await Admin.findOne({ email });
    if (user) return user;
    user = await Doctor.findOne({ email });
    if (user) return user;
    user = await Patient.findOne({ email });
    return user;
};

// Google Strategy
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
                    const roleFromState = req.query.state || 'Patient';
                    let user = await findOAuthUser(profile.id, 'google');

                    if (!user) {
                        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
                        if (email) {
                            user = await findUserByEmail(email);
                        }

                        if (user) {
                            user.googleId = profile.id;
                            if (!user.avatar && profile.photos && profile.photos.length > 0) {
                                user.avatar = profile.photos[0].value;
                            }
                            await user.save();
                        } else {
                            if (roleFromState === 'Admin' || roleFromState === 'SuperAdmin') {
                                user = await Admin.create({
                                    name: profile.displayName,
                                    email: email || `${profile.id}@google.placeholder.com`,
                                    googleId: profile.id,
                                    avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                                    role: roleFromState
                                });
                            } else if (roleFromState === 'Doctor') {
                                user = await Doctor.create({
                                    name: profile.displayName,
                                    email: email || `${profile.id}@google.placeholder.com`,
                                    googleId: profile.id,
                                    avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                                    role: 'Doctor'
                                });
                            } else {
                                user = await Patient.create({
                                    name: profile.displayName,
                                    email: email || `${profile.id}@google.placeholder.com`,
                                    googleId: profile.id,
                                    avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                                    role: 'Patient'
                                });
                            }
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
                passReqToCallback: true,
            },
            async (req, accessToken, refreshToken, profile, done) => {
                try {
                    const roleFromState = req.query.state || 'Patient';
                    let user = await findOAuthUser(profile.id, 'facebook');

                    if (!user) {
                        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
                        if (email) {
                            user = await findUserByEmail(email);
                        }

                        if (user) {
                            user.facebookId = profile.id;
                            if (!user.avatar && profile.photos && profile.photos.length > 0) {
                                user.avatar = profile.photos[0].value;
                            }
                            await user.save();
                        } else {
                            if (roleFromState === 'Admin' || roleFromState === 'SuperAdmin') {
                                user = await Admin.create({
                                    name: profile.displayName,
                                    email: email || `${profile.id}@facebook.placeholder.com`,
                                    facebookId: profile.id,
                                    avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                                    role: roleFromState
                                });
                            } else if (roleFromState === 'Doctor') {
                                user = await Doctor.create({
                                    name: profile.displayName,
                                    email: email || `${profile.id}@facebook.placeholder.com`,
                                    facebookId: profile.id,
                                    avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                                    role: 'Doctor'
                                });
                            } else {
                                user = await Patient.create({
                                    name: profile.displayName,
                                    email: email || `${profile.id}@facebook.placeholder.com`,
                                    facebookId: profile.id,
                                    avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                                    role: 'Patient'
                                });
                            }
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
