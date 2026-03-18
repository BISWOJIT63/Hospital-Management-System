import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MedicalRecord from '../models/MedicalRecord.js';
import Prescription from '../models/Prescription.js';
import Billing from '../models/Billing.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        let patient = await Patient.findOne({ role: 'Patient' });
        let doctor = await Doctor.findOne({ role: 'Doctor' });

        if (!patient) {
            console.log('Creating test patient...');
            patient = await Patient.create({
                name: 'John Doe',
                email: 'patient@example.com',
                password: 'password123',
                role: 'Patient',
                phone: '1234567890',
                gender: 'Male',
                dob: '1990-01-01'
            });
        }

        if (!doctor) {
            console.log('Creating test doctor...');
            doctor = await Doctor.create({
                name: 'Smith',
                email: 'doctor@example.com',
                password: 'password123',
                role: 'Doctor',
                phone: '0987654321',
                specialty: 'Cardiology',
                department: 'Cardiology'
            });
        }

        // Seed Medical Records
        await MedicalRecord.deleteMany({ patientId: patient._id });
        await MedicalRecord.create([
            {
                patientId: patient._id,
                doctorId: doctor._id,
                diagnosis: 'Seasonal Influenza',
                notes: 'Patient presented with high fever and cough. Prescribed rest and fluids.',
                date: new Date('2026-03-01')
            },
            {
                patientId: patient._id,
                doctorId: doctor._id,
                diagnosis: 'Routine Health Checkup',
                notes: 'All vitals normal. Recommended vitamin D supplements.',
                date: new Date('2026-02-15')
            }
        ]);

        // Seed Prescriptions
        await Prescription.deleteMany({ patientId: patient._id });
        await Prescription.create([
            {
                patientId: patient._id,
                doctorId: doctor._id,
                medications: [
                    { name: 'Oseltamivir', dosage: '75mg', frequency: 'Twice daily', duration: '5 days' },
                    { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '3 days' }
                ],
                instructions: 'Take after meals. Drink plenty of water.',
                status: 'active'
            }
        ]);

        // Seed Billing
        await Billing.deleteMany({ patientId: patient._id });
        await Billing.create([
            {
                patientId: patient._id,
                invoiceNumber: 'INV-2026-001',
                items: [
                    { description: 'Consultation Fee', amount: 500 },
                    { description: 'Laboratory Tests', amount: 1200 }
                ],
                totalAmount: 1700,
                paymentStatus: 'paid',
                paymentMethod: 'card',
                date: new Date('2026-03-01')
            },
            {
                patientId: patient._id,
                invoiceNumber: 'INV-2026-002',
                items: [
                    { description: 'General Checkup', amount: 800 }
                ],
                totalAmount: 800,
                paymentStatus: 'pending',
                date: new Date('2026-03-15')
            }
        ]);

        console.log('Seeding successful');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
