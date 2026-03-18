import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            return !this.googleId && !this.facebookId;
        }
    },
    role: {
        type: String,
        enum: ['SuperAdmin', 'Admin'],
        required: true
    },
    employeeId: { type: String },
    department: { type: String },
    avatar: { type: String },
    phone: { type: String },
    status: {
        type: String,
        enum: ['pending', 'active', 'rejected', 'on-hold'],
        default: 'active'
    },
    googleId: { type: String },
    facebookId: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

// Password hashing middleware
adminSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match password method
adminSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
