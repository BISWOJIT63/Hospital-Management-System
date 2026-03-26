import Admin from "../models/Admin.js";
import MedicalRecord from '../models/MedicalRecord.js';
import Prescription from '../models/Prescription.js';
import Billing from '../models/Billing.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';

export const seedDatabase = async (req, res) => {
    res.json({ message: 'Database seeding endpoint reachable' });
};

export const createSuperAdmin = async (req, res) => {
    try {
        const SUPER_ADMIN = {
            name: "Super Admin",
            email: "superadmin@aethercare.com",
            password: "SuperAdmin@123",
            role: "SuperAdmin",
            phone: "0000000000",
            employeeId: "SA-001",
            department: "Administration",
        };

        const existing = await Admin.findOne({ email: SUPER_ADMIN.email });
        if (existing) {
            return res.status(400).json({ message: `SuperAdmin already exists: ${existing.email}` });
        }

        const admin = await Admin.create(SUPER_ADMIN);
        res.status(201).json({ message: "SuperAdmin created successfully!", admin: admin.email });
    } catch (err) {
        console.error("Error creating super admin:", err.message);
        res.status(500).json({ error: err.message });
    }
};

export const seedPatientData = async (req, res) => {
    try {
        let patient = await Patient.findOne({ role: 'Patient' });
        let doctor = await Doctor.findOne({ role: 'Doctor' });

        if (!patient) {
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

        res.status(200).json({ message: 'Seeding successful' });
    } catch (error) {
        console.error('Seeding failed:', error);
        res.status(500).json({ error: error.message });
    }
};
