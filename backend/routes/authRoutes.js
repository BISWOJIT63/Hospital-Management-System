import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, getUserProfile, forgotPassword, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile);

router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// --- Google OAuth Routes ---
// Initiate Google Login
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google Callback
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, generate token and redirect to frontend
        const token = generateToken(req.user._id);
        res.redirect(`http://localhost:5173/login?token=${token}`);
    }
);

// --- Facebook OAuth Routes ---
// Initiate Facebook Login
router.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

// Facebook Callback
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, generate token and redirect to frontend
        const token = generateToken(req.user._id);
        res.redirect(`http://localhost:5173/login?token=${token}`);
    }
);

export default router;
