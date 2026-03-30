import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import Hospital from '../models/Hospital.js';
import Clinic from '../models/Clinic.js';
import Admin from '../models/Admin.js';
import MedicalRecord from '../models/MedicalRecord.js';
import Prescription from '../models/Prescription.js';
import Billing from '../models/Billing.js';

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private (Patient only)
export const createAppointment = async (req, res) => {
    try {
        if (req.user.role !== 'Patient') {
            return res.status(403).json({ success: false, message: 'Only patients can book appointments. ' + req.user.role + 's cannot book.' });
        }

        const { providerId, providerName, providerType, service, date, time, notes, appointmentType: appType, amount } = req.body;

        if (!providerType || !service || !date || !time) {
            return res.status(400).json({ success: false, message: 'Please provide providerType, service, date and time' });
        }

        if (providerId) {
            if (providerType === 'Doctor') {
                const doc = await Doctor.findById(providerId).catch(() => null);
                if (!doc) console.warn(`[Appointments] Doctor ${providerId} not found in DB`);
            } else if (providerType === 'Hospital') {
                const hosp = await Hospital.findById(providerId).catch(() => null);
                if (!hosp) console.warn(`[Appointments] Hospital ${providerId} not found in DB`);
            } else if (providerType === 'Clinic') {
                const clinic = await Clinic.findById(providerId).catch(() => null);
                if (!clinic) console.warn(`[Appointments] Clinic ${providerId} not found in DB`);
            } else if (providerType === 'Facility') {
                const fac = await Hospital.findById(providerId).catch(() => null) || await Clinic.findById(providerId).catch(() => null);
                if (!fac) console.warn(`[Appointments] Facility ${providerId} not found in DB`);
            }
        }

        const appointment = await Appointment.create({
            patientId: req.user._id,
            providerId: providerId || null,
            providerName: providerName || null,
            providerType,
            service,
            date,
            time,
            notes,
            appointmentType: appType || 'General',
            amount: amount || 500
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
            appointments = await Appointment.find({ patientId: req.user._id })
                .sort({ date: 1, time: 1 })
                .populate('patientId', 'name avatar email phone');
        } else if (req.user.role === 'Doctor') {
            appointments = await Appointment.find({ providerId: req.user._id, providerType: 'Doctor' })
                .sort({ date: 1, time: 1 })
                .populate('patientId', 'name avatar email phone');
        } else if (req.user.role === 'Admin') {
            const hospitals = await Hospital.find({ adminId: req.user._id }).select('_id');
            const clinics = await Clinic.find({ adminId: req.user._id }).select('_id');
            const facilityIds = [...hospitals, ...clinics].map(f => f._id);

            appointments = await Appointment.find({ providerId: { $in: facilityIds }, providerType: { $in: ['Facility', 'Hospital', 'Clinic'] } })
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

        let isAuthorized = false;

        if (req.user.role === 'SuperAdmin') isAuthorized = true;

        if (req.user.role === 'Patient' && appointment.patientId.toString() === req.user._id.toString() && status === 'cancelled') {
            isAuthorized = true;
        }

        if (req.user.role === 'Doctor' && appointment.providerType === 'Doctor' && appointment.providerId.toString() === req.user._id.toString()) {
            isAuthorized = true;
        }

        if (req.user.role === 'Admin' && (appointment.providerType === 'Facility' || appointment.providerType === 'Hospital' || appointment.providerType === 'Clinic')) {
            const fac = await Hospital.findById(appointment.providerId) || await Clinic.findById(appointment.providerId);
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

// @desc    Update appointment payment status
// @route   PUT /api/appointments/:id/payment
// @access  Private (Doctor, Admin, SuperAdmin)
export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;

        if (!['pending', 'paid', 'overdue'].includes(paymentStatus)) {
            return res.status(400).json({ success: false, message: 'Invalid payment status' });
        }

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        let isAuthorized = false;

        if (req.user.role === 'SuperAdmin') isAuthorized = true;

        if (req.user.role === 'Doctor' && appointment.providerType === 'Doctor' && appointment.providerId.toString() === req.user._id.toString()) {
            isAuthorized = true;
        }

        if (req.user.role === 'Admin' && (appointment.providerType === 'Facility' || appointment.providerType === 'Hospital' || appointment.providerType === 'Clinic')) {
            const fac = await Hospital.findById(appointment.providerId) || await Clinic.findById(appointment.providerId);
            if (fac && fac.adminId.toString() === req.user._id.toString()) {
                isAuthorized = true;
            }
        }

        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: 'Not authorized to update payment for this appointment' });
        }

        appointment.paymentStatus = paymentStatus;
        await appointment.save();

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get patient dashboard summary
// @route   GET /api/appointments/patient-dashboard
// @access  Private (Patient)
export const getPatientDashboard = async (req, res) => {
    try {
        const patientId = req.user._id;
        const appointments = await Appointment.find({ patientId }).sort({ date: -1 });

        const total = appointments.length;
        const today = new Date().toISOString().split('T')[0];
        const upcoming = appointments.filter(a => a.date >= today && a.status !== 'cancelled').length;
        const completed = appointments.filter(a => a.status === 'completed').length;
        const cancelled = appointments.filter(a => a.status === 'cancelled').length;

        const recent = appointments.slice(0, 5);
        const enriched = await Promise.all(recent.map(async (apt) => {
            let providerName = 'Unknown Provider';
            try {
                if (apt.providerType === 'Doctor') {
                    const doc = await Doctor.findById(apt.providerId).select('name');
                    if (doc) providerName = 'Dr. ' + doc.name;
                } else if (['Facility', 'Hospital', 'Clinic'].includes(apt.providerType)) {
                    const fac = await Hospital.findById(apt.providerId).select('name type') || await Clinic.findById(apt.providerId).select('name type');
                    if (fac) providerName = fac.name + (fac.type ? ` (${fac.type})` : '');
                }
            } catch (_) {}
            return {
                _id: apt._id,
                service: apt.service,
                date: apt.date,
                time: apt.time,
                status: apt.status,
                providerName,
                providerType: apt.providerType,
                notes: apt.notes
            };
        }));

        res.json({
            success: true,
            data: { total, upcoming, completed, cancelled, recentAppointments: enriched }
        });
    } catch (error) {
        console.error('Patient dashboard error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Complete checkup and generate records
// @route   POST /api/appointments/:id/checkup
// @access  Private (Doctor)
export const completeCheckup = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        if (req.user.role !== 'Doctor' || appointment.providerType !== 'Doctor' || appointment.providerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to complete this checkup' });
        }

        const { bp, pulse, temp, weight, diagnosis, prescription, notes, followUp } = req.body;

        // 1. Update Appointment Status
        appointment.status = 'completed';
        await appointment.save();

        // 2. Create Medical Record
        await MedicalRecord.create({
            patientId: appointment.patientId,
            doctorId: req.user._id,
            vitals: { bp, pulse, temp, weight },
            diagnosis: diagnosis || 'General checkup',
            notes: notes || ''
        });

        // 3. Create Prescription if provided
        if (prescription) {
            await Prescription.create({
                patientId: appointment.patientId,
                doctorId: req.user._id,
                instructions: prescription,
                medications: [{ name: prescription, dosage: "As prescribed", frequency: "As prescribed", duration: "As prescribed" }] 
            });
        }

        // 4. Create Billing record (duplicate/independent from appointment depending on structure, usually good to ensure it exists)
        // Check if billing already exists for this appointment
        const existingBill = await Billing.findOne({ appointmentId: appointment._id });
        if (!existingBill) {
            const invoiceNumber = 'INV-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
            await Billing.create({
                patientId: appointment.patientId,
                appointmentId: appointment._id,
                invoiceNumber,
                items: [{ description: diagnosis || 'General Checkup', amount: appointment.amount || 500 }],
                totalAmount: appointment.amount || 500,
                paymentStatus: appointment.paymentStatus || 'pending',
                date: new Date()
            });
        }

        res.status(200).json({ success: true, message: 'Checkup completed successfully', data: appointment });
    } catch (error) {
        console.error('Error completing checkup:', error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
