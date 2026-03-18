import Service from '../models/Service.js';

// @desc  Get all active services (public)
export const getServices = async (req, res) => {
    try {
        const { category, facilityId, doctorId, all } = req.query;
        let filter = { status: 'active' };
        
        // If facilityId or doctorId is provided, we might want all statuses (for admin view)
        if (facilityId || doctorId || all === 'true') {
            filter = {};
        }

        if (category && category !== 'All') filter.category = category;
        if (facilityId) filter.facilityId = facilityId;
        if (doctorId) filter.doctorId = doctorId;

        const services = await Service.find(filter)
            .populate('facilityId', 'name images type address city')
            .populate('doctorId', 'name profilePic avatar specialty')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: services });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc  Get single service by ID (public)
export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
            .populate('facilityId', 'name location')
            .populate('doctorId', 'name email');
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json({ success: true, data: service });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc  Create a service (Admin/Auth)
export const createService = async (req, res) => {
    try {
        const service = await Service.create({ ...req.body, createdBy: req.user._id });
        res.status(201).json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc  Update a service (Admin/Auth)
export const updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc  Delete a service (Admin/Auth)
export const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json({ success: true, message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
