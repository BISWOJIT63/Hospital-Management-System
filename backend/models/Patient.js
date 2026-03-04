import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: 'patient' },
    phone: { type: String },
    dob: { type: String },
    gender: { type: String },
    bloodGroup: { type: String },
    address: { type: String },
    emergencyContact: { type: String },
    medicalHistory: { type: String },
    googleId: { type: String },
    facebookId: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
