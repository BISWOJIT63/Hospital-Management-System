import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: 'doctor' },
    phone: { type: String },
    specialization: { type: String },
    experience: { type: String },
    department: { type: String },
    fee: { type: String },
    availability: { type: Array, default: [] },
    licenseNumber: { type: String },
    googleId: { type: String },
    facebookId: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
