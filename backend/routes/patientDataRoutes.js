import express from 'express';
import { getMyMedicalRecords, getMyPrescriptions, getMyInvoices } from '../controllers/patientDataController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/medical-records/my-records', protect, getMyMedicalRecords);
router.get('/prescriptions/my-prescriptions', protect, getMyPrescriptions);
router.get('/billing/my-invoices', protect, getMyInvoices);

export default router;
