import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            return !this.googleId && !this.facebookId;
        }
    },
    role: { type: String, default: 'Patient' },
    avatar: { type: String },
    phone: { type: String },
    status: {
        type: String,
        enum: ['pending', 'active', 'rejected', 'on-hold'],
        default: 'active'
    },
    gender: { type: String },
    dob: { type: String },
    bloodGroup: { type: String },
    address: { type: String },
    emergencyContact: { type: String },
    medicalHistory: { type: String },
    googleId: { type: String },
    facebookId: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

patientSchema.index({ createdAt: -1 });

// Password hashing middleware
patientSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match password method
patientSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
