import MedicalRecord from '../models/MedicalRecord.js';
import Prescription from '../models/Prescription.js';
import Billing from '../models/Billing.js';

// @desc    Get patient medical records
// @route   GET /api/medical-records/my-records
// @access  Private (Patient)
export const getMyMedicalRecords = async (req, res) => {
    try {
        const records = await MedicalRecord.find({ patientId: req.user._id })
            .populate('doctorId', 'name specialty avatar')
            .sort({ date: -1 });
        res.json({ success: true, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get patient prescriptions
// @route   GET /api/prescriptions/my-prescriptions
// @access  Private (Patient)
export const getMyPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patientId: req.user._id })
            .populate('doctorId', 'name specialty avatar')
            .sort({ date: -1 });
        res.json({ success: true, data: prescriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get patient billing invoices
// @route   GET /api/billing/my-invoices
// @access  Private (Patient)
export const getMyInvoices = async (req, res) => {
    try {
        const invoices = await Billing.find({ patientId: req.user._id })
            .sort({ date: -1 });
        res.json({ success: true, data: invoices });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
