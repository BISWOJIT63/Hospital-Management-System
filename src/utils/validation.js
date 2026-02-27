import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

const baseUserSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string(),
    avatar: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const adminSchema = baseUserSchema.and(
    z.object({
        employeeId: z.string().min(1, 'Employee ID is required'),
        department: z.string().min(1, 'Department is required'),
    })
);

export const doctorSchema = baseUserSchema.and(
    z.object({
        licenseNumber: z.string().min(1, 'License number is required'),
        specialization: z.string().min(1, 'Specialization is required'),
        experience: z.string().min(1, 'Experience is required'),
        department: z.string().min(1, 'Department is required'),
        consultationFee: z.string().min(1, 'Consultation fee is required'),
        availableDays: z.string().min(1, 'Availability is required'),
        certificate: z.any().optional(),
    })
);

export const patientSchema = baseUserSchema.and(
    z.object({
        dob: z.string().min(1, 'Date of birth is required'),
        gender: z.enum(['male', 'female', 'other'], { message: 'Gender is required' }),
        bloodGroup: z.string().min(1, 'Blood group is required'),
        address: z.string().min(5, 'Address is required'),
        emergencyContact: z.string().min(10, 'Emergency contact is required'),
        medicalHistory: z.string().optional(),
        insuranceDetails: z.string().optional(),
    })
);
