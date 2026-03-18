import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: false
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'hospitalType',
        required: false
    },
    hospitalType: {
        type: String,
        enum: ['Hospital', 'Clinic'],
        default: 'Hospital'
    },
    date: {
        type: Date,
        default: Date.now
    },
    diagnosis: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    attachments: [String] // URLs to files/images
}, { timestamps: true });

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
