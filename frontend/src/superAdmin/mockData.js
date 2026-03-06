import { PieChart, ClipboardCheck, Building2, Star, Activity, Settings } from 'lucide-react';

export const monthlyData = [
    { month: "Jan", hospitals: 12, clinics: 34, patients: 1240 },
    { month: "Feb", hospitals: 14, clinics: 38, patients: 1420 },
    { month: "Mar", hospitals: 15, clinics: 41, patients: 1680 },
    { month: "Apr", hospitals: 17, clinics: 45, patients: 1920 },
    { month: "May", hospitals: 18, clinics: 49, patients: 2100 },
    { month: "Jun", hospitals: 21, clinics: 55, patients: 2380 },
    { month: "Jul", hospitals: 23, clinics: 60, patients: 2640 },
    { month: "Aug", hospitals: 26, clinics: 64, patients: 2890 },
];
export const pieData = [
    { name: "Hospitals", value: 26, color: "#00f5d4" },
    { name: "Clinics", value: 64, color: "#7b2ff7" },
    { name: "Doctors", value: 312, color: "#f72585" },
];
export const serviceData = [
    { name: "Emergency", count: 480, color: "#f72585" },
    { name: "Surgery", count: 320, color: "#7b2ff7" },
    { name: "Cardiology", count: 290, color: "#00f5d4" },
    { name: "Pediatrics", count: 260, color: "#ffb700" },
    { name: "Neurology", count: 180, color: "#00e676" },
    { name: "Orthopedics", count: 150, color: "#a78bfa" },
];
export const pendingRegs = [
    { id: "REG-001", name: "Apollo Medical Center", type: "Hospital", city: "Mumbai", date: "2025-03-01", docs: 8, status: "pending" },
    { id: "REG-002", name: "Dr. Riya Sharma", type: "Doctor", city: "Delhi", date: "2025-03-02", docs: 4, status: "pending", specialty: "Cardiologist" },
    { id: "REG-003", name: "Sunrise Clinic", type: "Clinic", city: "Bangalore", date: "2025-03-03", docs: 5, status: "pending" },
    { id: "REG-004", name: "City Health Hub", type: "Clinic", city: "Chennai", date: "2025-03-04", docs: 3, status: "pending" },
    { id: "REG-005", name: "Dr. Amir Khan", type: "Doctor", city: "Hyderabad", date: "2025-03-05", docs: 4, status: "pending", specialty: "Neurologist" },
    { id: "REG-006", name: "Medicity Hospital", type: "Hospital", city: "Pune", date: "2025-03-06", docs: 10, status: "pending" },
];
export const approvedList = [
    { id: "H-001", name: "Apollo Medical Center", type: "Hospital", city: "Mumbai", approvedDate: "2025-02-10", status: "active", patients: 840 },
    { id: "C-001", name: "HealthFirst Clinic", type: "Clinic", city: "Delhi", approvedDate: "2025-01-20", status: "active", patients: 320 },
    { id: "D-001", name: "Dr. Priya Nair", type: "Doctor", city: "Bangalore", approvedDate: "2025-01-15", status: "active", patients: 180 },
    { id: "H-002", name: "Sunrise Hospital", type: "Hospital", city: "Chennai", approvedDate: "2025-02-01", status: "on-hold", patients: 620 },
    { id: "C-002", name: "Green Valley Clinic", type: "Clinic", city: "Kolkata", approvedDate: "2025-01-05", status: "active", patients: 210 },
    { id: "D-002", name: "Dr. Rahul Mehta", type: "Doctor", city: "Pune", approvedDate: "2025-02-18", status: "active", patients: 95 },
    { id: "H-003", name: "CureMax Hospital", type: "Hospital", city: "Ahmedabad", approvedDate: "2024-12-20", status: "active", patients: 1200 },
];
export const reviewsData = [
    { id: "RV-001", author: "Rajesh Kumar", entity: "Apollo Medical", rating: 5, text: "Excellent service. Doctors are very professional.", date: "2025-03-01", flag: false },
    { id: "RV-002", author: "Anonymous", entity: "Sunrise Clinic", rating: 1, text: "Terrible experience. Staff was rude. 4 hours wait.", date: "2025-03-02", flag: true },
    { id: "RV-003", author: "Meena Pillai", entity: "CureMax Hospital", rating: 4, text: "Good facilities. Minor billing department issue.", date: "2025-03-03", flag: false },
    { id: "RV-004", author: "Spam Account", entity: "HealthFirst", rating: 1, text: "FAKE FAKE FAKE do not trust this place!", date: "2025-03-04", flag: true },
    { id: "RV-005", author: "Dr. Reviewer", entity: "Apollo Medical", rating: 3, text: "Average. Improve appointment scheduling.", date: "2025-03-05", flag: false },
];
export const logs = [
    { time: "10:42 AM", action: "Approved", entity: "Apollo Medical Center", color: "#00e676" },
    { time: "10:38 AM", action: "Rejected", entity: "QuickFix Clinic (Fraud)", color: "#ff3b6b" },
    { time: "09:55 AM", action: "Removed Review", entity: "Spam – HealthFirst", color: "#ff3b6b" },
    { time: "09:22 AM", action: "Placed on Hold", entity: "Sunrise Hospital", color: "#ffb700" },
    { time: "08:44 AM", action: "New Registration", entity: "Dr. Amir Khan", color: "#7b2ff7" },
    { time: "08:30 AM", action: "Login", entity: "Super Admin Session", color: "#00f5d4" },
];

export const navSections = [
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "approvals", label: "Approvals", icon: ClipboardCheck, badge: 6 },
    { id: "manage", label: "Manage", icon: Building2 },
    { id: "reviews", label: "Reviews", icon: Star, badge: 2 },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
];
