import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    action: { type: String, required: true }, // e.g., 'Approved', 'Rejected', 'Removed Review', 'Placed on Hold', 'New Registration', 'Login'
    entityName: { type: String, required: true }, // e.g., 'Apollo Medical Center', 'Dr. Amir Khan', 'Super Admin Session'
    type: { type: String, required: true }, // e.g., 'Registration', 'Approval', 'Auth', 'Review'
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who performed the action (often SuperAdmin)
    targetId: { type: mongoose.Schema.Types.ObjectId }, // ID of the affected entity
    color: { type: String } // Optional: For frontend badge coloring, but usually better handled in frontend logic. Putting here as backup.
}, { timestamps: true });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
