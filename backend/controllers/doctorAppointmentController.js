import User from '../models/User.js';

export const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'Doctor' }).select('-password');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const getDoctorById = async (req, res) => {
    try {
        const doctor = await User.findOne({ _id: req.params.id, role: 'Doctor' }).select('-password');
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const createDoctor = async (req, res) => {
    res.status(201).json({ message: "Doctor creation logic here" });
};

export const getMyAppointments = async (req, res) => {
    res.json([]);
};

export const createAppointment = async (req, res) => {
    res.status(201).json({ message: "Appointment created" });
};
