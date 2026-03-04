import Admin from '../models/Admin.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import DoctorProfile from '../models/DoctorProfile.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const {
        name, email, password, role,
        phone, employeeId, department,
        specialization, experience, consultationFee, availableDays, licenseNumber,
        dob, gender, bloodGroup, address, emergencyContact, medicalHistory
    } = req.body;

    const requestedRole = role || 'patient';

    try {
        // Check if email exists in any collection
        const adminExists = await Admin.findOne({ email });
        const doctorExists = await Doctor.findOne({ email });
        const patientExists = await Patient.findOne({ email });

        if (adminExists || doctorExists || patientExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let user;

        if (requestedRole === 'admin') {
            user = await Admin.create({
                name,
                email,
                password: hashedPassword,
                role: 'admin',
                phone,
                employeeId,
                department,
                revenueData: [
                    { month: "Aug", revenue: 980000, expenses: 620000 },
                    { month: "Sep", revenue: 1050000, expenses: 670000 },
                    { month: "Oct", revenue: 920000, expenses: 590000 },
                    { month: "Nov", revenue: 1180000, expenses: 720000 },
                    { month: "Dec", revenue: 1340000, expenses: 810000 },
                    { month: "Jan", revenue: 1120000, expenses: 690000 },
                    { month: "Feb", revenue: 1420000, expenses: 860000 },
                ],
                patientData: [
                    { day: "Mon", opd: 148, ipd: 62 },
                    { day: "Tue", opd: 172, ipd: 74 },
                    { day: "Wed", opd: 121, ipd: 51 },
                    { day: "Thu", opd: 196, ipd: 83 },
                    { day: "Fri", opd: 218, ipd: 91 },
                    { day: "Sat", opd: 155, ipd: 58 },
                    { day: "Sun", opd: 88, ipd: 31 },
                ],
                bedData: [
                    { name: "Occupied", value: 71, color: "#0ea5e9" },
                    { name: "Available", value: 21, color: "#10b981" },
                    { name: "Maintenance", value: 8, color: "#f59e0b" },
                ],
                deptPatients: [
                    { dept: "Cardiology", value: 312 },
                    { dept: "Neurology", value: 248 },
                    { dept: "Orthopedics", value: 276 },
                    { dept: "Oncology", value: 189 },
                    { dept: "Pediatrics", value: 224 },
                ]
            });
        } else if (requestedRole === 'doctor') {
            user = await Doctor.create({
                name,
                email,
                password: hashedPassword,
                role: 'doctor',
                phone,
                specialization: specialization || 'General',
                experience,
                department,
                fee: consultationFee,
                availability: availableDays ? [availableDays] : [],
                licenseNumber
            });

            // Automatically build out an Independent Doctor Portfolio wrapper since they signed up externally
            await DoctorProfile.create({
                doctorId: user._id,
                title: "",
                specialty: specialization || 'General',
                location: "",
                rating: 0,
                reviewsCount: 0,
                experience: experience ? `${experience} Years` : "New",
                appointmentsBooked: "0",
                awardsCount: "0",
                priceRange: consultationFee ? `$${consultationFee}` : "Not Set",
                acceptingPatients: true,
                about: `Welcome to the profile of ${name}. Please update this bio via the dashboard!`,
                experienceList: [],
                insurances: [],
                specialties: [],
                services: [],
                availability: [],
                clinics: [],
                memberships: [],
                awards: [],
                businessHours: [],
                reviews: []
            });
        } else {
            user = await Patient.create({
                name,
                email,
                password: hashedPassword,
                role: 'patient',
                phone,
                dob,
                gender,
                bloodGroup,
                address,
                emergencyContact,
                medicalHistory
            });
        }

        if (user) {
            // Send back common fields and all extra data using spread on user._doc (Mongoose internal) or toObject()
            const userData = user.toObject();
            delete userData.password; // ensure password hash isn't returned

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

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Admin.findOne({ email });
        if (!user) user = await Doctor.findOne({ email });
        if (!user) user = await Patient.findOne({ email });

        if (user && user.password && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get user profile (via token)
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        let user = await Admin.findById(req.user._id);
        if (!user) user = await Doctor.findById(req.user._id);
        if (!user) user = await Patient.findById(req.user._id);

        if (user) {
            // Send back common fields and all extra data using spread on user._doc (Mongoose internal) or toObject()
            const userData = user.toObject();
            delete userData.password; // ensure password hash isn't returned

            res.json({
                ...userData,
                token: req.headers.authorization.split(' ')[1] // return same token back if needed, or simply don't return token in /me
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Forgot Password - Generate Token
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await Admin.findOne({ email });
        if (!user) user = await Doctor.findOne({ email });
        if (!user) user = await Patient.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User with that email not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash token and set to resetPasswordToken field
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set token expire (10 minutes)
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Normally you would send an email here.
        // For development, we'll log it and return a message.
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        console.log(`[Email Simulator] Send to: ${user.email}`);
        console.log(`[Email Simulator] Reset password URL: ${resetUrl}`);

        res.json({ message: 'Password reset link sent to your email (simulated in console)' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Reset Password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // Find user by token and ensure token hasn't expired
        let user = await Admin.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            user = await Doctor.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            });
        }

        if (!user) {
            user = await Patient.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid token or token expired' });
        }

        // Hash the new password and set it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

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
