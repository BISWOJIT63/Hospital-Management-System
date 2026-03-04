import Admin from '../models/Admin.js';

// @desc    Get analytics data for the logged in Admin
// @route   GET /api/analytics/my-analytics
// @access  Private (Admin)
export const getMyAnalytics = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user._id).select('revenueData patientData bedData deptPatients');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.json({
            revenueData: admin.revenueData || [],
            patientData: admin.patientData || [],
            bedData: admin.bedData || [],
            deptPatients: admin.deptPatients || []
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
