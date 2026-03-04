import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: 'admin' },
    phone: { type: String },
    employeeId: { type: String },
    department: { type: String },
    googleId: { type: String },
    facebookId: { type: String },
    revenueData: { type: Array, default: [] },
    patientData: { type: Array, default: [] },
    bedData: { type: Array, default: [] },
    deptPatients: { type: Array, default: [] },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
