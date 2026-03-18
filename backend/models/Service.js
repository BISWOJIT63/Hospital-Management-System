import mongoose from 'mongoose';

const treatmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
});

const pricingSchema = new mongoose.Schema({
    package: { type: String, required: true },
    price: { type: String, required: true },
    includes: [{ type: String }],
});

const businessHourSchema = new mongoose.Schema({
    day: { type: String, required: true },
    time: { type: String, default: 'Closed' },
    isOpen: { type: Boolean, default: true },
    highlight: { type: Boolean, default: false },
});

const serviceSchema = new mongoose.Schema({
    facilityId: { type: mongoose.Schema.Types.ObjectId, refPath: 'facilityType', default: null },
    facilityType: { type: String, enum: ['Hospital', 'Clinic'], default: 'Hospital' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null },
    name: { type: String, required: true, trim: true },
    category: {
        type: String,
        enum: ['Diagnostics', 'Consultation', 'Preventive', 'Emergency', 'Surgery', 'Therapy', 'Other'],
        default: 'Other',
    },
    description: { type: String, required: true },
    images: { type: [{ type: String }], required: true },        // array of base64 or URLs
    price: { type: String, required: true },
    duration: { type: String, required: true },
    includes: [{ type: String }],                 // short bullet benefits
    treatments: [treatmentSchema],
    pricing: [pricingSchema],
    businessHours: [businessHourSchema],
    rating: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0 },
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, refPath: 'creatorRole' },
    creatorRole: { type: String, enum: ['Admin', 'SuperAdmin', 'Doctor'], default: 'Admin' },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
