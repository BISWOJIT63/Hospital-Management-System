import User from '../models/User.js';
import DoctorProfile from '../models/DoctorProfile.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';

export const registerUser = async (req, res) => {
    const {
        name, email, password, role,
        phone, employeeId, department,
        specialization, experience, consultationFee, availableDays, licenseNumber,
        dob, gender, bloodGroup, address, emergencyContact, medicalHistory
    } = req.body;

    // Map frontend roles to backend enum
    let assignedRole = 'Patient';
    if (role === 'admin') assignedRole = 'Admin';
    if (role === 'doctor') assignedRole = 'Doctor';
    if (role === 'patient') assignedRole = 'Patient';
    if (role === 'SuperAdmin') assignedRole = 'SuperAdmin'; // Keep option open

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: assignedRole,
            phone,
            gender,
            dob,
            bloodGroup,
            address,
            // Depending on role, we could store generic extra fields in address or a new metadata object,
            // but for now we follow the schema
        });

        if (assignedRole === 'Doctor') {
            await DoctorProfile.create({
                userId: user._id,
                specialty: specialization || 'General',
                experience: experience ? `${experience} Years` : "New",
                priceRange: consultationFee ? `$${consultationFee}` : "Not Set",
                about: `Welcome to the profile of ${name}. Please update this bio via the dashboard!`,
            });
        }

        if (user) {
            const userData = user.toObject();
            delete userData.password;

            res.status(201).json({
                ...userData,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const userData = user.toObject();
            delete userData.password;

            res.json({
                ...userData,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            const userData = user.toObject();
            delete userData.password;

            res.json({
                ...userData,
                token: req.headers.authorization.split(' ')[1]
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User with that email not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        console.log(`[Email Simulator] Send to: ${user.email}`);
        console.log(`[Email Simulator] Reset password URL: ${resetUrl}`);

        res.json({ message: 'Password reset link sent to your email (simulated in console)' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token or token expired' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({
            message: 'Password reset successful!',
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
