import Clinic from '../models/Clinic.js';

export const getClinics = async (req, res) => {
    try {
        const clinics = await Clinic.find({ status: 'active' }).sort({ createdAt: -1 });
        if (clinics.length === 0) {
            const approved = await Clinic.find({ status: 'approved' }).sort({ createdAt: -1 });
            return res.json({ success: true, data: approved });
        }
        res.json({ success: true, data: clinics });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const getClinicById = async (req, res) => {
    try {
        const clinic = await Clinic.findById(req.params.id);
        if (clinic) {
            res.json({ success: true, data: clinic });
        } else {
            res.status(404).json({ success: false, message: 'Clinic not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
