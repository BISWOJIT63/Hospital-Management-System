import Admin from '../models/Admin.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import Hospital from '../models/Hospital.js';
import Clinic from '../models/Clinic.js';
import ActivityLog from '../models/ActivityLog.js';
import Review from '../models/Review.js';
import Appointment from '../models/Appointment.js';

const getMonthlyCounts = async (Model, matchQuery) => {
    const currentYear = new Date().getFullYear();
    const result = await Model.aggregate([
        {
            $match: {
                ...matchQuery,
                createdAt: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`)
                }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 }
            }
        }
    ]);

    const months = Array(12).fill(0);
    result.forEach(r => {
        months[r._id - 1] = r.count;
    });
    return months;
};

export const getMyAnalytics = async (req, res) => {
    try {
        const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const currentYear = new Date().getFullYear();

        let revenueData = MONTH_NAMES.map(m => ({ month: m, revenue: 0, expenses: 0 }));
        let deptPatients = [];
        let bedData = [{ name: "Confirmed", value: 0, color: "#10b981" }, { name: "Pending", value: 0, color: "#f59e0b" }, { name: "Cancelled", value: 0, color: "#ef4444" }];
        let patientData = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => ({ day: d, opd: 0, ipd: 0 }));
        let totalBookings = 0, totalPatients = 0, avgRating = 0, totalReviews = 0;

        if (req.user.role === 'Admin') {
            let facility = await Hospital.findOne({ adminId: req.user._id }).sort({ createdAt: -1 });
            if (!facility) facility = await Clinic.findOne({ adminId: req.user._id }).sort({ createdAt: -1 });

            if (facility) {
                const facilityId = facility._id;

                const monthlyAppts = await Appointment.aggregate([
                    { $match: {
                        providerId: facilityId,
                        createdAt: { $gte: new Date(`${currentYear}-01-01`), $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`) }
                    }},
                    { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } }
                ]);
                revenueData = MONTH_NAMES.map((month, i) => {
                    const m = monthlyAppts.find(x => x._id === i + 1);
                    const apps = m ? m.count : 0;
                    return { month, revenue: apps * 1500, expenses: apps * 400 };
                });

                const topServices = await Appointment.aggregate([
                    { $match: { providerId: facilityId } },
                    { $group: { _id: "$service", value: { $sum: 1 } } },
                    { $sort: { value: -1 } },
                    { $limit: 6 }
                ]);
                deptPatients = topServices.length > 0
                    ? topServices.map(s => ({ dept: s._id || "General", value: s.value }))
                    : (facility.departments || []).slice(0, 6).map(d => ({ dept: d.name || "Dept", value: 0 }));

                const statusAgg = await Appointment.aggregate([
                    { $match: { providerId: facilityId } },
                    { $group: { _id: "$status", count: { $sum: 1 } } }
                ]);
                const getCount = (s) => statusAgg.find(x => x._id === s)?.count || 0;
                const confirmed = getCount('confirmed') + getCount('accepted') + getCount('completed');
                const pending = getCount('pending');
                const cancelled = getCount('cancelled');
                bedData = [
                    { name: "Confirmed", value: confirmed, color: "#10b981" },
                    { name: "Pending",   value: pending,   color: "#f59e0b" },
                    { name: "Cancelled", value: cancelled, color: "#ef4444" }
                ];

                const weeklyAppts = await Appointment.aggregate([
                    { $match: { providerId: facilityId } },
                    { $group: { _id: { $dayOfWeek: "$createdAt" }, count: { $sum: 1 } } }
                ]);
                const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                patientData = dayNames.map((day, i) => {
                    const m = weeklyAppts.find(w => w._id === i + 1);
                    const c = m ? m.count : 0;
                    return { day, opd: c, ipd: Math.floor(c * 0.25) };
                });

                totalBookings = await Appointment.countDocuments({ providerId: facilityId });

                const uniquePatients = await Appointment.distinct('patientId', { providerId: facilityId });
                totalPatients = uniquePatients.filter(Boolean).length;

                const reviews = await Review.find({ entityId: facilityId });
                if (reviews.length > 0) {
                    avgRating = parseFloat((reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1));
                    totalReviews = reviews.length;
                }
            }
        }

        res.json({
            revenueData,
            patientData,
            bedData,
            deptPatients,
            summary: {
                totalBookings,
                totalPatients,
                avgRating,
                totalReviews
            }
        });

    } catch (error) {
        console.error('[getMyAnalytics]', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getSuperAdminDashboard = async (req, res) => {
    try {
        const currentYearStart = new Date(`${new Date().getFullYear()}-01-01`);
        const currentYearEnd = new Date(`${new Date().getFullYear()}-12-31T23:59:59.999Z`);

        const [
            patientsCount,
            doctorsCount,
            hospitalsCount,
            clinicsCount,
            pendingFacilities,
            pendingDoctors,
            approvedFacilities,
            recentReviews,
            recentLogs,
            patientMonths,
            hospitalMonths,
            clinicMonths,
            topServices
        ] = await Promise.all([
            Patient.countDocuments({}),
            Doctor.countDocuments({}),
            Hospital.countDocuments({}),
            Clinic.countDocuments({}),
            Promise.all([
                Hospital.find({ status: 'pending' }, 'name type city createdAt documents status').sort({ createdAt: -1 }).limit(20).lean(),
                Clinic.find({ status: 'pending' }, 'name type city createdAt documents status').sort({ createdAt: -1 }).limit(20).lean()
            ]).then(([h, c]) => [...h, ...c].sort((a,b) => (new Date(b.createdAt) - new Date(a.createdAt)))),
            Doctor.find({ status: 'pending' }, 'name city createdAt documents status specialty category').sort({ createdAt: -1 }).limit(20).lean(), 
            Promise.all([
                Hospital.find({ status: { $in: ['active', 'approved'] } }, 'name type city approvedDate status patientsCount').sort({ approvedDate: -1 }).limit(50).lean(),
                Clinic.find({ status: { $in: ['active', 'approved'] } }, 'name type city approvedDate status patientsCount').sort({ approvedDate: -1 }).limit(50).lean(),
                Doctor.find({ status: { $in: ['active', 'approved'] } }, 'name city approvedDate status patientsTreated').sort({ approvedDate: -1 }).limit(50).lean()
            ]).then(([h, c, d]) => [...h, ...c, ...d.map(doc => ({...doc, type: 'Doctor', patientsCount: doc.patientsTreated}))].sort((a,b) => (new Date(b.approvedDate || 0) - new Date(a.approvedDate || 0)))),
            Review.find({}, 'authorId entityType rating text createdAt status').populate('authorId', 'name').sort({ createdAt: -1 }).limit(20).lean(),
            ActivityLog.find({}, 'action entityName color createdAt').sort({ createdAt: -1 }).limit(20).lean(),
            getMonthlyCounts(Patient, {}),
            getMonthlyCounts(Hospital, {}),
            getMonthlyCounts(Clinic, {}),
            Appointment.aggregate([
                { $match: { createdAt: { $gte: currentYearStart, $lte: currentYearEnd } } },
                { $group: { _id: "$service", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 3 }
            ]).allowDiskUse(true)
        ]);


        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyData = monthNames.map((month, i) => ({
            month,
            patients: patientMonths[i] || 0,
            hospitals: hospitalMonths[i] || 0,
            clinics: clinicMonths[i] || 0
        }));

        const pieData = [
            { name: "Hospitals", value: hospitalsCount || 0, color: "#00f5d4" },
            { name: "Clinics", value: clinicsCount || 0, color: "#7b2ff7" },
            { name: "Doctors", value: doctorsCount || 0, color: "#f72585" },
        ];
        
        const serviceColors = ["#f72585", "#7b2ff7", "#00f5d4"];
        const serviceData = topServices.length > 0 ? topServices.map((s, i) => ({
            name: s._id || "Other",
            count: s.count,
            color: serviceColors[i] || "#ccc"
        })) : [ 
            { name: "No Services Booked", count: 1, color: "#5a8a84" }
        ];

        // Safe Date Formatting Helpers
        const safeISODate = (date) => {
            if (!date) return 'N/A';
            const d = new Date(date);
            return isNaN(d.getTime()) ? 'N/A' : d.toISOString().split('T')[0];
        };

        const safeTimeFormat = (date) => {
            if (!date) return 'N/A';
            const d = new Date(date);
            if (isNaN(d.getTime())) return 'N/A';
            try {
                return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: 'numeric' }).format(d);
            } catch (err) {
                return 'N/A';
            }
        };

        const mappedPendingRegs = [
            ...pendingFacilities.map(f => ({
                id: f._id,
                name: f.name,
                type: f.type,
                city: f.city,
                date: safeISODate(f.createdAt),
                docs: f.documents?.length || 0,
                status: f.status
            })),
            ...pendingDoctors.map(d => ({
                id: d._id,
                name: d.name,
                type: 'Doctor',
                city: d.city || 'N/A', 
                date: safeISODate(d.createdAt),
                docs: d.documents?.length || 0,
                status: d.status,
                specialty: d.specialty || 'Medical Specialist',
                category: d.category || 'N/A'
            }))
        ];

        const mappedApprovedList = approvedFacilities.map(f => ({
            id: f._id,
            name: f.name,
            type: f.type,
            city: f.city,
            approvedDate: safeISODate(f.approvedDate),
            status: f.status,
            patients: f.patientsCount || 0
        }));

        res.json({
            monthlyData,
            pieData,
            serviceData,
            pendingRegs: mappedPendingRegs.slice(0, 10),
            approvedList: mappedApprovedList,
            reviewsData: recentReviews.map(r => ({
                id: r._id,
                author: r.authorId?.name || "Anonymous",
                entity: r.entityType,
                rating: r.rating,
                text: r.text,
                date: safeISODate(r.createdAt),
                status: r.status || 'published'
            })),
            logs: recentLogs.map(l => ({
                id: l._id,
                time: safeTimeFormat(l.createdAt),
                action: l.action,
                entity: l.entityName,
                color: l.color || "#00f5d4"
            })),
            adminName: req.user?.name || "SuperAdmin",
            adminEmail: req.user?.email || ""
        });
    } catch (error) {
        console.error('SuperAdmin Dashboard Critical Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const getDoctorAnalytics = async (req, res) => {
    try {
        const doctorId = req.user._id;
        const currentYear = new Date().getFullYear();
        
        const weeklyAppts = await Appointment.aggregate([
            {
                $match: {
                    providerId: doctorId,
                    createdAt: {
                        $gte: new Date(new Date().setDate(new Date().getDate() - 7))
                    }
                }
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    count: { $sum: 1 }
                }
            }
        ]);
        
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weeklyAptData = days.map((day, index) => {
            const match = weeklyAppts.find(w => w._id === index + 1);
            return { day, appts: match ? match.count : 0 };
        });

        const fee = 500; 
        const monthlyAppts = await Appointment.aggregate([
            {
                $match: {
                    providerId: doctorId,
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            }
        ]);
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const patientIds = await Appointment.distinct("patientId", { providerId: doctorId });
        let totalRevenue = 0;
        
        const revenueData = monthNames.map((month, index) => {
            const match = monthlyAppts.find(m => m._id === index + 1);
            const count = match ? match.count : 0;
            const rev = count * fee;
            if(match) totalRevenue += rev;
            return { name: month, value: rev };
        });

        const topServices = await Appointment.aggregate([
            { $match: { providerId: doctorId } },
            { $group: { _id: "$service", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 4 }
        ]);
        
        const colors = ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];
        let conditionData = topServices.map((s, i) => ({
            name: s._id || "General",
            value: s.count,
            color: colors[i] || "#ccc"
        }));
        
        if (conditionData.length === 0) {
            conditionData = [{ name: "No Conditions", value: 1, color: "#cbd5e1" }];
        }
        
        const patientTrend = monthNames.map((month, index) => {
            const match = monthlyAppts.find(m => m._id === index + 1);
            return { name: month, new: match ? match.count : 0, returning: match ? Math.floor(match.count * 0.3) : 0 };
        });
        
        const statusCounts = await Appointment.aggregate([
            { $match: { providerId: doctorId } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        
        const getCount = (status) => statusCounts.find(s => s._id === status)?.count || 0;
        const totalApt = statusCounts.reduce((acc, curr) => acc + curr.count, 0) || 1;
        const completed = getCount("completed") + getCount("confirmed");
        
        const radialData = [
            { name: 'Completed', value: Math.floor((completed / totalApt) * 100), fill: '#10b981' },
            { name: 'Pending', value: Math.floor((getCount("pending") / totalApt) * 100), fill: '#f59e0b' },
            { name: 'Cancelled', value: Math.floor((getCount("cancelled") / totalApt) * 100), fill: '#ef4444' }
        ];

        res.json({
            success: true,
            data: {
                weeklyApt: weeklyAptData,
                revenueData,
                conditionData,
                patientTrend,
                radialData,
                totalRevenue,
                uniquePatients: patientIds.length
            }
        });

    } catch (error) {
        console.error('Doctor Analytics Error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
