import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import passport from './config/passport.js';

import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            console.warn("MongoDB URI is not defined in environment variables. Starting server without DB connection.");
            return;
        }
        await mongoose.connect(mongoURI);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', hospitalRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('Hospital Management System Backend API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
