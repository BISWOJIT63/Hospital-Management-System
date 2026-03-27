import Hospital from '../models/Hospital.js';
import Clinic from '../models/Clinic.js';

export const getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find({ status: 'active' }).sort({ createdAt: -1 }).lean();
        // Fallback or map to avoid empty arrays if none are active but some are approved
        if (hospitals.length === 0) {
            const approved = await Hospital.find({ status: 'approved' }).sort({ createdAt: -1 }).lean();
            return res.json({ success: true, data: approved.map(h => ({ ...h, type: 'Hospital' })) });
        }
        res.json({ success: true, data: hospitals.map(h => ({ ...h, type: 'Hospital' })) });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id).populate('doctors');
        if (hospital) {
            res.json({ success: true, data: hospital });
        } else {
            res.status(404).json({ success: false, message: 'Hospital not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const getDepartments = async (req, res) => {
    try {
        const hospitals = await Hospital.find({ status: { $in: ['active', 'approved'] } });
        const clinics = await Clinic.find({ status: { $in: ['active', 'approved'] } });
        const allDepts = [...hospitals, ...clinics].reduce((acc, f) => {
            if (f.departments) acc.push(...f.departments);
            return acc;
        }, []);
        res.json({ success: true, data: allDepts });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const getFacilities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;
        const type = req.query.type; // Optional: 'Hospital' or 'Clinic'

        const query = { status: { $in: ['active', 'approved'] } };
        
        // Optimize: Only fetch what's requested
        let hospitals = [], clinics = [], hospitalCount = 0, clinicCount = 0;

        if (!type || type === 'All' || type === 'Hospital') {
            [hospitals, hospitalCount] = await Promise.all([
                Hospital.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
                Hospital.countDocuments(query)
            ]);
        }

        if (!type || type === 'All' || type === 'Clinic') {
            [clinics, clinicCount] = await Promise.all([
                Clinic.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
                Clinic.countDocuments(query)
            ]);
        }

        const facilities = [
            ...hospitals.map(h => ({ ...h, type: 'Hospital' })),
            ...clinics.map(c => ({ ...c, type: 'Clinic' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);

        res.json({ 
            success: true, 
            count: hospitalCount + clinicCount,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil((hospitalCount + clinicCount) / limit)
            },
            data: facilities 
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};



export const getReviews = async (req, res) => {
    res.json([]);
};

export const getAwards = async (req, res) => {
    res.json([]);
};
