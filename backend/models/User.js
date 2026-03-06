import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            // Password is only required if there's no OAuth ID
            return !this.googleId && !this.facebookId;
        }
    },
    role: {
        type: String,
        enum: ['SuperAdmin', 'Admin', 'Doctor', 'Patient'],
        required: true
    },
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
    googleId: { type: String },
    facebookId: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

// Password hashing middleware - skip if no password (OAuth users)
userSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
