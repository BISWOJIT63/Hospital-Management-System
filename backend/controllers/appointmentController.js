import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import Facility from '../models/Facility.js';

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private (Patient only)
export const createAppointment = async (req, res) => {
    try {
        if (req.user.role !== 'Patient') {
            return res.status(403).json({ success: false, message: 'Only patients can book appointments. ' + req.user.role + 's cannot book.' });
        }

        const { providerId, providerType, service, date, time, notes } = req.body;

        if (!providerId || !providerType || !service || !date || !time) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        // Optional: basic validation to check if provider exists
        if (providerType === 'Doctor') {
            const doc = await User.findOne({ _id: providerId, role: 'Doctor' });
            if (!doc) return res.status(404).json({ success: false, message: 'Doctor not found' });
        } else if (providerType === 'Facility') {
            const fac = await Facility.findById(providerId);
            if (!fac) return res.status(404).json({ success: false, message: 'Facility not found' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid provider type' });
        }

        const appointment = await Appointment.create({
            patientId: req.user._id,
            providerId,
            providerType,
            service,
            date,
            time,
            notes
        });

        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Get user's appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
export const getMyAppointments = async (req, res) => {
    try {
        let appointments = [];

        if (req.user.role === 'Patient') {
            // Patient sees their own bookings
            appointments = await Appointment.find({ patientId: req.user._id })
                .sort({ date: 1, time: 1 })
                .populate('patientId', 'name avatar email phone');

            // Note: Manual population or aggregation may be needed to get Doctor/Facility details 
            // since providerId is polymorphic. We can fetch them inline for now.
        } else if (req.user.role === 'Doctor') {
            // Doctor sees bookings where providerId is their userId
            appointments = await Appointment.find({ providerId: req.user._id, providerType: 'Doctor' })
                .sort({ date: 1, time: 1 })
                .populate('patientId', 'name avatar email phone');
        } else if (req.user.role === 'Admin') {
            // Admin sees bookings for all facilities they own
            const facilities = await Facility.find({ adminId: req.user._id }).select('_id');
            const facilityIds = facilities.map(f => f._id);

            appointments = await Appointment.find({ providerId: { $in: facilityIds }, providerType: 'Facility' })
                .sort({ date: 1, time: 1 })
                .populate('patientId', 'name avatar email phone');
        } else if (req.user.role === 'SuperAdmin') {
            appointments = await Appointment.find({})
                .sort({ date: -1 })
                .populate('patientId', 'name avatar');
        }

        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Authorization logic
        let isAuthorized = false;

        if (req.user.role === 'SuperAdmin') isAuthorized = true;

        if (req.user.role === 'Patient' && appointment.patientId.toString() === req.user._id.toString() && status === 'cancelled') {
            // Patients can only cancel their own appointments
            isAuthorized = true;
        }

        if (req.user.role === 'Doctor' && appointment.providerType === 'Doctor' && appointment.providerId.toString() === req.user._id.toString()) {
            isAuthorized = true;
        }

        if (req.user.role === 'Admin' && appointment.providerType === 'Facility') {
            const fac = await Facility.findById(appointment.providerId);
            if (fac && fac.adminId.toString() === req.user._id.toString()) {
                isAuthorized = true;
            }
        }

        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
