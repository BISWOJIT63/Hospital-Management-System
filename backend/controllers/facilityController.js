import Facility from '../models/Facility.js';




export const createFacility = async (req, res) => {
    try {
        const adminId = req.user._id;

        
        const existing = await Facility.findOne({ adminId });
        if (existing) {
            return res.status(400).json({ success: false, message: 'You have already registered a facility.' });
        }

        const newFacility = await Facility.create({
            ...req.body,
            adminId,
            status: 'pending' 
        });

        res.status(201).json({ success: true, facility: newFacility });
    } catch (error) {
        console.error('Error creating facility:', error);
        res.status(500).json({ success: false, message: 'Server error creating facility', error: error.message });
    }
};




export const getMyFacility = async (req, res) => {
    try {
        const facility = await Facility.findOne({ adminId: req.user._id });

        
        if (!facility) {
            return res.status(200).json({ success: true, facility: null });
        }

        res.status(200).json({ success: true, facility });
    } catch (error) {
        console.error('Error fetching admin facility:', error);
        res.status(500).json({ success: false, message: 'Server error retrieving facility' });
    }
};
