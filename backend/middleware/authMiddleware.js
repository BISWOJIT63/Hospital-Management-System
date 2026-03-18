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

            let user;
            if (decoded.role === 'Admin' || decoded.role === 'SuperAdmin') {
                user = await Admin.findById(decoded.id).select('-password');
            } else if (decoded.role === 'Doctor') {
                user = await Doctor.findById(decoded.id).select('-password');
            } else if (decoded.role === 'Patient') {
                user = await Patient.findById(decoded.id).select('-password');
            }

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

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

export const admin = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'SuperAdmin')) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

export const superAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'SuperAdmin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a SuperAdmin' });
    }
};

export const doctor = (req, res, next) => {
    if (req.user && req.user.role === 'Doctor') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a doctor' });
    }
};
