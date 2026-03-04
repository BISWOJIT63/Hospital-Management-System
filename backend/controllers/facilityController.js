import Facility from '../models/Facility.js';

// @desc    Create a new facility for the logged-in admin
// @route   POST /api/facilities
// @access  Private (Admin only)
export const createFacility = async (req, res) => {
    try {
        const adminId = req.user._id;

        // Check if admin already has a facility
        const existing = await Facility.findOne({ adminId });
        if (existing) {
            return res.status(400).json({ success: false, message: 'You have already registered a facility.' });
        }

        const newFacility = await Facility.create({
            ...req.body,
            adminId,
            status: 'pending' // Force initial status
        });

        res.status(201).json({ success: true, facility: newFacility });
    } catch (error) {
        console.error('Error creating facility:', error);
        res.status(500).json({ success: false, message: 'Server error creating facility', error: error.message });
    }
};

// @desc    Get the facility belonging to the logged in Admin
// @route   GET /api/facilities/my-facility
// @access  Private (Admin only)
export const getMyFacility = async (req, res) => {
    try {
        const facility = await Facility.findOne({ adminId: req.user._id });

        // It's perfectly fine if they don't have one, we just return null so the frontend knows to show "AddHospital"
        if (!facility) {
            return res.status(200).json({ success: true, facility: null });
        }

        res.status(200).json({ success: true, facility });
    } catch (error) {
        console.error('Error fetching admin facility:', error);
        res.status(500).json({ success: false, message: 'Server error retrieving facility' });
    }
};
