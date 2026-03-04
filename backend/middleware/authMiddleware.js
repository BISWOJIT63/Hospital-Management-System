import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

            let user = await Admin.findById(decoded.id).select('-password');
            if (!user) user = await Doctor.findById(decoded.id).select('-password');
            if (!user) user = await Patient.findById(decoded.id).select('-password');

            req.user = user;
            return next();
        } catch (error) {
            console.error('Auth middleware error:', error);
            return res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to check admin role
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

// Middleware to check doctor role
export const doctor = (req, res, next) => {
    if (req.user && req.user.role === 'doctor') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a doctor' });
    }
};
