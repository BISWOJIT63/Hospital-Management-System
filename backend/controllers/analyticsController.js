import User from '../models/User.js';
import Facility from '../models/Facility.js';
import DoctorProfile from '../models/DoctorProfile.js';
import ActivityLog from '../models/ActivityLog.js';
import Review from '../models/Review.js';

export const getMyAnalytics = async (req, res) => {
    try {
        // Based on the frontend expectancies, returning some generic arrays for now
        // if user is 'Admin' they expect revenueData, patientData etc. 
        // We'll give random mock data or defaults to prevent crashing while waiting for real implementation 
        // since Admin schema is unified now.

        res.json({
            revenueData: [
                { month: "Jan", revenue: 1120000, expenses: 690000 },
                { month: "Feb", revenue: 1420000, expenses: 860000 }
            ],
            patientData: [
                { day: "Mon", opd: 148, ipd: 62 },
                { day: "Tue", opd: 172, ipd: 74 }
            ],
            bedData: [
                { name: "Occupied", value: 71, color: "#0ea5e9" },
                { name: "Available", value: 21, color: "#10b981" }
            ],
            deptPatients: [
                { dept: "Cardiology", value: 312 },
                { dept: "Neurology", value: 248 }
            ]
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getSuperAdminDashboard = async (req, res) => {
    try {
        const [
            patientsCount,
            doctorsCount,
            hospitalsCount,
            clinicsCount,
            pendingFacilities,
            pendingDoctors,
            approvedFacilities,
            recentReviews,
            recentLogs
        ] = await Promise.all([
            User.countDocuments({ role: 'Patient' }),
            User.countDocuments({ role: 'Doctor' }),
            Facility.countDocuments({ type: 'Hospital' }),
            Facility.countDocuments({ type: 'Clinic' }),
            Facility.find({ status: 'pending' }).sort({ createdAt: -1 }).limit(10).populate('adminId', 'name'),
            User.find({ role: 'Doctor', status: 'pending' }).sort({ createdAt: -1 }).limit(10), // Assuming status pending
            Facility.find({ status: 'active' }).sort({ approvedDate: -1 }).limit(10),
            Review.find().sort({ createdAt: -1 }).limit(10).populate('authorId', 'name'),
            ActivityLog.find().sort({ createdAt: -1 }).limit(15)
        ]);

        // Monthly Data (Mocked out for now until real date aggregation) 
        // In reality, this would be an aggregation pipeline.
        const monthlyData = [
            { month: "Jan", hospitals: 12, clinics: 34, patients: 1240 },
            { month: "Feb", hospitals: 14, clinics: 38, patients: 1420 },
            { month: "Mar", hospitals: 15, clinics: 41, patients: 1680 },
            { month: "Apr", hospitals: 17, clinics: 45, patients: 1920 },
            { month: "May", hospitals: 18, clinics: 49, patients: 2100 },
            { month: "Jun", hospitals: 21, clinics: 55, patients: 2380 },
            { month: "Jul", hospitals: Math.floor(hospitalsCount / 2), clinics: Math.floor(clinicsCount / 2), patients: Math.floor(patientsCount / 2) },
            { month: "Aug", hospitals: hospitalsCount, clinics: clinicsCount, patients: patientsCount },
        ];

        const pieData = [
            { name: "Hospitals", value: hospitalsCount || 26, color: "#00f5d4" },
            { name: "Clinics", value: clinicsCount || 64, color: "#7b2ff7" },
            { name: "Doctors", value: doctorsCount || 312, color: "#f72585" },
        ];

        // Format Pending Regs for SuperAdmin Dashboard
        const mappedPendingRegs = [
            ...pendingFacilities.map(f => ({
                id: f._id,
                name: f.name,
                type: f.type,
                city: f.city,
                date: f.createdAt.toISOString().split('T')[0],
                docs: f.documents.length || 0,
                status: f.status
            })),
            ...pendingDoctors.map(d => ({
                id: d._id,
                name: d.name,
                type: 'Doctor',
                city: 'N/A', // Needs populating DoctorProfile in real scale
                date: d.createdAt.toISOString().split('T')[0],
                docs: 0,
                status: d.status,
                specialty: 'Medical Specialist'
            }))
        ];

        const mappedApprovedList = approvedFacilities.map(f => ({
            id: f._id,
            name: f.name,
            type: f.type,
            city: f.city,
            approvedDate: f.approvedDate ? f.approvedDate.toISOString().split('T')[0] : 'N/A',
            status: f.status,
            patients: f.patientsCount
        }));

        res.json({
            monthlyData,
            pieData,
            serviceData: [ // Mocked for now, needs real aggregation from DoctorProfile.specialty
                { name: "Emergency", count: 480, color: "#f72585" },
                { name: "Surgery", count: 320, color: "#7b2ff7" },
                { name: "Cardiology", count: 290, color: "#00f5d4" }
            ],
            pendingRegs: mappedPendingRegs.slice(0, 10),
            approvedList: mappedApprovedList,
            reviewsData: recentReviews.map(r => ({
                id: r._id,
                author: r.authorId?.name || "Anonymous",
                entity: r.entityType,
                rating: r.rating,
                text: r.text,
                date: r.createdAt.toISOString().split('T')[0],
                flag: r.isFlagged
            })),
            logs: recentLogs.map(l => ({
                id: l._id,
                time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: 'numeric' }).format(new Date(l.createdAt)),
                action: l.action,
                entity: l.entityName,
                color: l.color || "#00f5d4"
            }))
        });
    } catch (error) {
        console.error('SuperAdmin Dashboard Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
