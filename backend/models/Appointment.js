import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'providerType',
        required: false,
        default: null
    },
    providerName: {
        type: String,
        default: null
    },
    providerType: {
        type: String,
        enum: ['Doctor', 'Hospital', 'Clinic', 'Facility'],
        required: true
    },
    service: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    notes: {
        type: String,
        maxlength: 500
    },
    amount: {
        type: Number,
        default: 500
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'overdue'],
        default: 'pending'
    },
    package: {
        type: String,
        default: 'Basic'
    },
    appointmentType: {
        type: String,
        default: 'General'
    }
}, {
    timestamps: true
});

appointmentSchema.index({ status: 1 });
appointmentSchema.index({ providerId: 1 });
appointmentSchema.index({ createdAt: -1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
