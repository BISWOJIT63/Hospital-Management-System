import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import { api } from "../utils/api";
import RegisterForm from "./pages/RegisterForm";
import PendingScreen from "./pages/PendingScreen";
import RejectedScreen from "./pages/RejectedScreen";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Overview from "./components/Overview";
import Patients from "./components/Patients";
import Checkup from "./components/Checkup";
import Comms from "./components/Comms";
import Billing from "./components/Billing";
import Reviews from "./components/Reviews";
import ProfileSettings from "./components/ProfileSettings";
import Services from "./components/Services";
import { Icon, ic } from "./icons";
const INITIAL_DOCTOR_DATA = {
  name: "",
  category: "",
  status: "incomplete",
  specialty: "",
  licenseNo: "",
  experience: "",
  phone: "",
  email: "",
  emergencyEmail: "",
  basePrice: "",
  about: "",
  profilePic: null,
  treatments: [],
  specialists: [],
  pricing: [],
  businessHours: [
      { day: "Monday", isOpen: true, time: "09:00 AM - 05:00 PM" },
      { day: "Tuesday", isOpen: true, time: "09:00 AM - 05:00 PM" },
      { day: "Wednesday", isOpen: true, time: "09:00 AM - 05:00 PM" },
      { day: "Thursday", isOpen: true, time: "09:00 AM - 05:00 PM" },
      { day: "Friday", isOpen: true, time: "09:00 AM - 05:00 PM" },
      { day: "Saturday", isOpen: true, time: "10:00 AM - 02:00 PM" },
      { day: "Sunday", isOpen: false, time: "" },
  ],
  rating: "-",
  reviewsCount: "-",
  patientsTreated: "-",
  successRate: "-",
};

export default function DoctorPortal() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  
  
  const [screen, setScreen] = useState("loading");
  const [notif, setNotif] = useState(null);

  
  const [doctorData, setDoctorData] = useState(INITIAL_DOCTOR_DATA);

  
  const [activeTab, setActiveTab] = useState("overview");
  const [gSearch, setGSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Sub-tabs Data
  const [patients, setPatients] = useState([]);
  const [ptFilter, setPtFilter] = useState("all");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.getMyAppointments();
        if (res.success || res.data) {
          const raw = res.data || res;
          const mapped = raw.map(a => ({
            id: a._id,
            name: a.patientId?.name || "Patient",
            avatar: a.patientId?.avatar || null,
            age: 30, // Mock
            gender: "Unknown", // Mock
            blood: "O+", // Mock
            condition: a.service, // Use service as condition
            date: a.date,
            time: a.time,
            type: a.service.includes("Online") ? "Online" : "In-Person",
            status: a.status === "confirmed" ? "approved" : (a.status === "cancelled" ? "rejected" : a.status),
            history: [] // Mock
          }));
          setPatients(mapped);

          const billingMapped = raw.map(a => ({
             id: a._id.substring(0, 8).toUpperCase(),
             fullId: a._id,
             patient: a.patientId?.name || "Patient",
             date: new Date(a.date).toISOString().split('T')[0],
             service: a.service,
             amount: a.amount || 500,
             status: a.paymentStatus || "pending",
             pkg: a.package || "Basic"
          }));
          setBilling(billingMapped);
        }
      } catch (err) {
        console.error("Failed to fetch doctor appointments", err);
      }
    };
    if (token) {
      fetchPatients();
    }
  }, [token]);

  const [checkupPt, setCheckupPt] = useState(null);
  const [checkupForm, setCheckupForm] = useState({});

  const [comms, setComms] = useState({});
  const [activePtId, setActivePtId] = useState(null);

  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [commMode, setCommMode] = useState("chat");
  const [chatMsg, setChatMsg] = useState("");
  const [callActive, setCallActive] = useState(false);
  const chatEndRef = useRef(null);

  const [billing, setBilling] = useState([]);
  const [billFilter, setBillFilter] = useState("all");
  const [billStatusOpen, setBillStatusOpen] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sentReplies, setSentReplies] = useState({});
  const [services, setServices] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(INITIAL_DOCTOR_DATA);

  const [analyticsData, setAnalyticsData] = useState({
     weeklyApt: [],
     revenueData: [],
     conditionData: [],
     patientTrend: [],
     radialData: [],
     totalRevenue: 0,
     uniquePatients: 0
  });

  useEffect(() => {
    const fetchAnalytics = () => {
      api.getDoctorAnalytics().then(res => {
          if (res.success) {
              setAnalyticsData(res.data);
          }
      }).catch(err => console.error("Failed to fetch analytics", err));
    };

    if (token) {
        fetchAnalytics();
        const interval = setInterval(fetchAnalytics, 10000);
        return () => clearInterval(interval);
    }
  }, [token]);

  // Computed
  const pendingCount = patients.filter((p) => p.status === "pending").length;
  const avgRating = reviews.length > 0 ? (
    reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
  ).toFixed(1) : 0;
  const totalRevenue = analyticsData.totalRevenue || billing
    .filter((b) => b.status === "paid")
    .reduce((SUM, b) => SUM + b.amount, 0);

  
  const searchResults = [
    ...patients.map((p) => ({
      type: "patient",
      label: p.name,
      sub: p.condition,
      tab: "patients",
    })),
    ...billing.map((b) => ({
      type: "invoice",
      label: b.id,
      sub: b.patient,
      tab: "billing",
    })),
    ...reviews.map((r) => ({
      type: "review",
      label: r.patient,
      sub: r.text.slice(0, 30) + "…",
      tab: "reviews",
    })),
  ].filter(
    (r) =>
      r.label.toLowerCase().includes(gSearch.toLowerCase()) ||
      r.sub.toLowerCase().includes(gSearch.toLowerCase()),
  );

  const screenRef = React.useRef(screen);
  useEffect(() => {
    screenRef.current = screen;
  }, [screen]);

  const fetchProfileRef = React.useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await api.getDoctorProfile(token);
        if (response.success && response.data) {
          const profile = response.data;
          setDoctorData(profile);

          const currentScreen = screenRef.current;

          if (profile.status === 'incomplete') {
            // Only navigate to register if not already intentionally there
            if (currentScreen !== 'register') setScreen('register');
          } else if (profile.status === 'pending') {
            setScreen('pending');
          } else if (profile.status === 'rejected') {
            // Don't override if the user is actively filling the resubmit form
            if (currentScreen !== 'register') setScreen('rejected');
          } else if (profile.status === 'approved' || profile.status === 'active') {
            setScreen('dashboard');
            if (!id && profile._id) {
               navigate(`/doctor/dashboard/${profile._id}`, { replace: true });
            }
            
            // Also fetch reviews when profile is loaded
            try {
              const reviewDocs = await api.getDoctorReviews(profile.userId || profile._id);
              if (Array.isArray(reviewDocs)) {
                // Map the backend Review schema to the shape the UI expects
                const mappedReviews = reviewDocs.map(r => ({
                  id: r._id,
                  patient: r.authorId?.name || "Patient",
                  rating: r.rating || 5,
                  text: r.text || "",
                  date: new Date(r.createdAt).toISOString().split('T')[0],
                  avatar: r.authorId?.avatar || null,
                  reply: r.reply // pass reply through
                }));
                setReviews(mappedReviews);
              }
            } catch (rErr) {
              console.error("Failed to fetch reviews", rErr);
            }

            // Also fetch services
            try {
              const sRes = await api.getServices({ doctorId: profile._id });
              if (sRes.success) {
                setServices(sRes.data);
              }
            } catch (sErr) {
              console.error("Failed to fetch services", sErr);
            }

          } else {
            if (currentScreen !== 'register') setScreen('register');
          }
        }
      } catch (err) {
        console.error("Error fetching doctor profile", err);
      }
    };

    // Store in ref so the interval always calls the freshest version
    fetchProfileRef.current = fetchProfile;

    // Run immediately on mount / token change
    fetchProfile();

    // Always-on 2s polling — updates screen state whenever status changes in DB
    const interval = setInterval(() => {
      fetchProfileRef.current?.();
    }, 2000);

    return () => clearInterval(interval);
  }, [token]);


  useEffect(() => {
    
    if (activeTab === "comms" && commMode === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comms, activeTab, commMode, activePtId]);

  useEffect(() => {
    if (editMode && !editData?._id) { 
      // Only set initial edit data when entering edit mode if it hasn't been set yet
      // or if you want it to always sync ONCE when toggled.
      setEditData(doctorData);
    }
  }, [editMode]);

  
  const showNotif = (msg, type = "success") => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 3000);
  };

  const submitRegistration = async (data) => {
    try {
      const response = await api.submitDoctorRegistration(data, token);
      if (response.success) {
        setDoctorData(response.data);
        setScreen("pending");
        showNotif("Application submitted for review!", "success");
      } else {
        showNotif(response.message || "Submission failed", "warning");
      }
    } catch (err) {
      console.error(err);
      showNotif(err.message || "An error occurred during submission", "warning");
    }
  };

  
  const approvePatient = async (id) => {
    try {
      await api.updateAppointmentStatus(id, "confirmed");
      setPatients((p) => p.map((x) => (x.id === id ? { ...x, status: "approved" } : x)));
      showNotif("Patient approved");
    } catch (e) {
      showNotif("Failed to approve", "warning");
    }
  };
  const rejectPatient = async (id) => {
    try {
      await api.updateAppointmentStatus(id, "cancelled");
      setPatients((p) => p.map((x) => (x.id === id ? { ...x, status: "rejected" } : x)));
      showNotif("Patient rejected", "warning");
    } catch (e) {
      showNotif("Failed to reject", "warning");
    }
  };

  const updatePaymentStatus = async (id, status) => {
    try {
      const bill = billing.find(b => b.id === id);
      if (!bill) return;
      await api.updateAppointmentPaymentStatus(bill.fullId, status);
      setBilling((prev) =>
        prev.map((x) =>
          x.id === id ? { ...x, status: status } : x
        )
      );
      showNotif(`Invoice ${id} marked as ${status}`, status === "overdue" ? "warning" : "success");
    } catch (e) {
      showNotif("Failed to update payment status", "warning");
    }
  };

  
  const startCheckup = (p) => {
    setCheckupPt(p);
    setCheckupForm({});
    setActiveTab("checkup");
  };
  const endCheckup = async () => {
    try {
      await api.completeCheckup(checkupPt.id, checkupForm);
      setPatients((p) => p.map((x) => (x.id === checkupPt.id ? { ...x, status: "completed" } : x)));
      showNotif(`Checkup completed for ${checkupPt.name}`);
      setCheckupPt(null);
      setActiveTab("patients");
    } catch (e) {
      showNotif("Failed to complete checkup", "warning");
    }
  };

  
  const sendMsg = () => {
    if (!chatMsg.trim() || !activePtId) return;
    setComms((prev) => {
      const existing = prev[activePtId] || { msgs: [], calls: [] };
      return {
        ...prev,
        [activePtId]: {
          ...existing,
          msgs: [
            ...existing.msgs,
            {
              text: chatMsg,
              from: "doctor",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        },
      };
    });
    setChatMsg("");
  };

  // ─── RENDERERS ───────────────────────────────────────────────────────────────
  if (screen === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-green-200 dark:border-green-900 border-t-green-600 dark:border-t-green-500 rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">Loading profile…</p>
        </div>
      </div>
    );
  }

  if (screen === "register") {
    // Merge the nested profile sub-object into a flat object so RegisterForm can pre-fill fields
    const prefillData = {
      name: doctorData?.profile?.name || doctorData?.name || "",
      specialty: doctorData?.profile?.specialty || "",
      licenseNo: doctorData?.profile?.licenseNo || "",
      experience: doctorData?.profile?.experience || "",
      phone: doctorData?.profile?.phone || "",
      email: doctorData?.profile?.email || doctorData?.email || "",
      emergencyEmail: doctorData?.profile?.emergencyEmail || "",
      category: doctorData?.profile?.category || "",
      basePrice: doctorData?.profile?.basePrice || "",
      about: doctorData?.profile?.about || "",
      city: doctorData?.profile?.city || doctorData?.city || "",
      location: doctorData?.profile?.location || doctorData?.location || "",
      availability: doctorData?.profile?.availability || "",
      treatments: doctorData?.profile?.treatments || [],
      pricing: doctorData?.profile?.pricing || [],
      specialists: doctorData?.profile?.specialists || [],
      businessHours: doctorData?.profile?.businessHours || [],
    };
    return <RegisterForm onSubmit={submitRegistration} initialData={prefillData} />;
  }

  if (screen === "pending") {
    return <PendingScreen doctorData={doctorData} />;
  }

  if (screen === "rejected") {
    return <RejectedScreen doctorData={doctorData} onRetry={() => setScreen("register")} />;
  }

  // If status is not approved/active and we are at /doctor/dashboard/:id, we should probably redirect back or show pending
  if (screen !== 'dashboard' && id) {
     // Wait for fetchProfile to handle it
  }

  if (screen !== 'dashboard') {
    // Other states like register, pending are handled above or show nothing here (which shouldn't happen)
    // Actually, if screen is 'loading', we return loading above.
    // If screen is 'pending', we return PendingScreen above.
    // So by now, if it's not 'dashboard', it's already returned.
  }

  const navItems = [
    { key: "overview", icon: ic.home, label: "Overview" },
    { key: "patients", icon: ic.patients, label: "Patients", badge: pendingCount },
    { key: "comms", icon: ic.comms, label: "Communications" },
    { key: "billing", icon: ic.billing, label: "Billing & Invoices" },
    { key: "reviews", icon: ic.star, label: "Reviews & Rating" },
    { key: "services", icon: ic.upload, label: "Manage Services" },
    { key: "profile", icon: ic.settings, label: "Service Profile" },
  ];

  return (
    <div className="min-h-screen df bg-slate-50 dark:bg-slate-950 flex transition-colors">
      {}
      {notif && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div
            className={`px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold text-white ${notif.type === "warning" ? "bg-amber-600" : "bg-slate-900"
              }`}
          >
            <Icon
              path={notif.type === "warning" ? ic.clock : ic.check}
              size={16}
              className={notif.type === "warning" ? "text-amber-200" : "text-green-400"}
            />
            {notif.msg}
          </div>
        </div>
      )}

      {}
      <Sidebar
        doctorData={doctorData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
        navItems={navItems}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {}
        <div className="lg:hidden h-14 shrink-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 sticky top-0 z-30">
          <button
             onClick={() => setIsMobileMenuOpen(true)}
             className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
          <h1 className="ml-2 text-sm font-black capitalize text-slate-800 dark:text-white">
            {activeTab}
          </h1>
        </div>

        {}
        <div className="p-6 flex-1 overflow-auto">
          {activeTab === "overview" && (
            <Overview
              patients={patients}
              pendingCount={pendingCount}
              avgRating={avgRating}
              totalRevenue={analyticsData.totalRevenue || totalRevenue}
              reviews={reviews}
              setActiveTab={setActiveTab}
              patientTrend={analyticsData.patientTrend}
              conditionData={analyticsData.conditionData}
              weeklyApt={analyticsData.weeklyApt}
              radialData={analyticsData.radialData}
              revenueData={analyticsData.revenueData}
              ratingTrend={[]}
            />
          )}

          {activeTab === "patients" && (
            <Patients
              patients={patients}
              ptFilter={ptFilter}
              setPtFilter={setPtFilter}
              approvePatient={approvePatient}
              rejectPatient={rejectPatient}
              startCheckup={startCheckup}
              setActivePtId={setActivePtId}
              setCommMode={setCommMode}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "checkup" && (
            <Checkup
              checkupPt={checkupPt}
              setCheckupPt={setCheckupPt}
              checkupForm={checkupForm}
              setCheckupForm={setCheckupForm}
              endCheckup={endCheckup}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "comms" && (
            <Comms
              patients={patients}
              activePtId={activePtId}
              setActivePtId={setActivePtId}
              comms={comms}
              commMode={commMode}
              setCommMode={setCommMode}
              chatMsg={chatMsg}
              setChatMsg={setChatMsg}
              sendMsg={sendMsg}
              callActive={callActive}
              setCallActive={setCallActive}
              doctorData={doctorData}
              chatEndRef={chatEndRef}
            />
          )}

          {activeTab === "billing" && (
            <Billing
              billing={billing}
              billFilter={billFilter}
              setBillFilter={setBillFilter}
              billStatusOpen={billStatusOpen}
              setBillStatusOpen={setBillStatusOpen}
              updatePaymentStatus={updatePaymentStatus}
              showNotif={showNotif}
            />
          )}

          {activeTab === "reviews" && (
            <Reviews
              reviews={reviews}
              avgRating={avgRating}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyText={replyText}
              setReplyText={setReplyText}
              sentReplies={sentReplies}
              setSentReplies={setSentReplies}
              showNotif={showNotif}
            />
          )}

          {activeTab === "services" && (
            <Services
              doctorId={doctorData?._id}
              showNotif={showNotif}
              onUpdate={() => {
                // Refresh services in parent when child updates
                api.getServices({ doctorId: doctorData?._id }).then(res => {
                  if (res.success) setServices(res.data);
                });
              }}
            />
          )}

          {activeTab === "profile" && (
            <ProfileSettings
              doctorData={doctorData}
              editMode={editMode}
              setEditMode={setEditMode}
              editData={editData}
              setEditData={setEditData}
              setDoctorData={setDoctorData}
              showNotif={showNotif}
              services={services}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </main>
    </div>
  );
}
