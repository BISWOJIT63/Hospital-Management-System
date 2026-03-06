import User from '../models/User.js';
import DoctorProfile from '../models/DoctorProfile.js';

export const getDoctorProfile = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'Not authorized, user ID missing' });
        }
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'Doctor user not found' });
        }

        const profile = await DoctorProfile.findOne({ userId: req.user._id });

        res.status(200).json({
            success: true,
            data: {
                ...user.toObject(),
                profile: profile ? profile.toObject() : null
            }
        });
    } catch (error) {
        console.error('Error fetching doctor profile:', error);
        res.status(500).json({ success: false, message: error.message || 'Server Error' });
    }
};

export const submitRegistrationDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = { ...req.body };

        // Ensure user is marked as pending review
        await User.findByIdAndUpdate(userId, { status: 'pending' });

        const profile = await DoctorProfile.findOneAndUpdate(
            { userId },
            { ...updateData },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Registration details submitted successfully',
            data: profile
        });

    } catch (error) {
        console.error('Error submitting doctor details:', error);
        res.status(400).json({ success: false, message: error.message || 'Server Error' });
    }
};

export const updateDoctorStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'active', 'rejected', 'on-hold'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.status(200).json({
            success: true,
            message: `Doctor status updated to ${status}`,
            data: user
        });

    } catch (error) {
        console.error('Error updating doctor status:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
