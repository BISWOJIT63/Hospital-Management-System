import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { api } from "../utils/api";
import RegisterForm from "./pages/RegisterForm";
import PendingScreen from "./pages/PendingScreen";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Overview from "./components/Overview";
import Patients from "./components/Patients";
import Checkup from "./components/Checkup";
import Comms from "./components/Comms";
import Billing from "./components/Billing";
import Reviews from "./components/Reviews";
import ProfileSettings from "./components/ProfileSettings";
import { Icon, ic } from "./icons";
import {
  MOCK_PATIENTS,
  MOCK_REVIEWS,
  MOCK_BILLING,
  MOCK_COMMS,
  INITIAL_SERVICE,
} from "./mockData";

export default function DoctorPortal() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  
  
  const [screen, setScreen] = useState("loading");
  const [notif, setNotif] = useState(null);

  
  const [doctorData, setDoctorData] = useState(INITIAL_SERVICE);

  
  const [activeTab, setActiveTab] = useState("overview");
  const [gSearch, setGSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Sub-tabs Data
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [ptFilter, setPtFilter] = useState("all");

  const [checkupPt, setCheckupPt] = useState(null);
  const [checkupForm, setCheckupForm] = useState({});

  const [comms, setComms] = useState(MOCK_COMMS);
  const [activePtId, setActivePtId] = useState(null);

  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [commMode, setCommMode] = useState("chat");
  const [chatMsg, setChatMsg] = useState("");
  const [callActive, setCallActive] = useState(false);
  const chatEndRef = useRef(null);

  const [billing, setBilling] = useState(MOCK_BILLING);
  const [billFilter, setBillFilter] = useState("all");
  const [billStatusOpen, setBillStatusOpen] = useState(null);

  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sentReplies, setSentReplies] = useState({});

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(INITIAL_SERVICE);

  // Computed
  const pendingCount = patients.filter((p) => p.status === "pending").length;
  const avgRating = (
    reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
  ).toFixed(1);
  const totalRevenue = billing
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

  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await api.getDoctorProfile(token);
        if (response.success && response.data) {
          const profile = response.data;
          setDoctorData(profile);
          if (profile.status === 'incomplete') {
            setScreen('register');
          } else if (profile.status === 'pending') {
            setScreen('pending');
          } else if (profile.status === 'approved') {
            setScreen('dashboard');
          } else {
            setScreen('register'); 
          }
        }
      } catch (err) {
        console.error("Error fetching doctor profile", err);
        setScreen("register");
      }
    };
    fetchProfile();
  }, [token]);

  useEffect(() => {
    
    if (activeTab === "comms" && commMode === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comms, activeTab, commMode, activePtId]);

  useEffect(() => {
    
    if (editMode) setEditData(doctorData);
  }, [editMode, doctorData]);

  
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

  
  const approvePatient = (id) => {
    setPatients((p) => p.map((x) => (x.id === id ? { ...x, status: "approved" } : x)));
    showNotif("Patient approved");
  };
  const rejectPatient = (id) => {
    setPatients((p) => p.map((x) => (x.id === id ? { ...x, status: "rejected" } : x)));
    showNotif("Patient rejected", "warning");
  };

  
  const startCheckup = (p) => {
    setCheckupPt(p);
    setCheckupForm({});
    setActiveTab("checkup");
  };
  const endCheckup = () => {
    showNotif(`Checkup completed for ${checkupPt.name}`);
    setCheckupPt(null);
    setActiveTab("patients");
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
    return <RegisterForm onSubmit={submitRegistration} initialData={doctorData} />;
  }

  if (screen === "pending") {
    return <PendingScreen doctorData={doctorData} onApproved={() => setScreen("dashboard")} />;
  }

  const navItems = [
    { key: "overview", icon: ic.home, label: "Overview" },
    { key: "patients", icon: ic.patients, label: "Patients", badge: pendingCount },
    { key: "comms", icon: ic.comms, label: "Communications" },
    { key: "billing", icon: ic.billing, label: "Billing & Invoices" },
    { key: "reviews", icon: ic.star, label: "Reviews & Rating" },
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
        <Topbar
          activeTab={activeTab}
          navItems={navItems}
          gSearch={gSearch}
          setGSearch={setGSearch}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          searchResults={searchResults}
          setActiveTab={setActiveTab}
          pendingCount={pendingCount}
          doctorData={doctorData}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {}
        <div className="p-6 flex-1 overflow-auto">
          {activeTab === "overview" && (
            <Overview
              patients={patients}
              pendingCount={pendingCount}
              avgRating={avgRating}
              totalRevenue={totalRevenue}
              reviews={reviews}
              setActiveTab={setActiveTab}
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
              setBilling={setBilling}
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

          {activeTab === "profile" && (
            <ProfileSettings
              doctorData={doctorData}
              editMode={editMode}
              setEditMode={setEditMode}
              editData={editData}
              setEditData={setEditData}
              setDoctorData={setDoctorData}
              showNotif={showNotif}
            />
          )}
        </div>
      </main>
    </div>
  );
}
