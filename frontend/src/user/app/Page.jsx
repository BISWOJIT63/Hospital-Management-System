import { useState, useEffect } from "react";
import { Calendar, Download } from "lucide-react";


import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";


import ProfileHero from "../components/ProfileHero";
import PersonalInfo from "../components/PersonalInfo";
import EmergencyContact from "../components/EmergencyContact";

import Preferences from "../components/Preferences";
import SecurityCard from "../components/SecurityCard";


import MetricsGrid from "../components/MetricsGrid";
import MedicationsTable from "../components/MedicationsTable";
import RefillTracker from "../components/RefillTracker";
import RightSidebar from "../components/RightSidebar";


import ChatList from "../components/chat/ChatList";
import ChatWindow, { doctorsInfo } from "../components/chat/ChatWindow";
import CallScreen from "../components/chat/CallScreen";
import VideoCallScreen from "../components/chat/VideoCallScreen";

import MedicalRecords from "../components/MedicalRecords";
import Prescriptions from "../components/Prescriptions";
import Billing from "../components/Billing";


import { AuthContext } from "../../components/context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../../components/context/ThemeContext";

function SettingsPage({ theme }) {
  const { user } = useContext(AuthContext);
  return (
    <div className="space-y-8">
      <ProfileHero theme={theme} user={user} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PersonalInfo theme={theme} user={user} />
          <EmergencyContact theme={theme} user={user} />
        </div>
        <div className="space-y-8">
          <Preferences theme={theme} />
          <SecurityCard theme={theme} />
        </div>
      </div>
      <Footer theme={theme} />
    </div>
  );
}


function DashboardPage({ theme, patientData, user }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className={`text-3xl font-black tracking-tight text-balance ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {user?.name ? `${user.name}'s Dashboard` : 'Patient Dashboard'}
          </h3>
          <p className={`mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Real-time appointment monitoring and health tracking.
          </p>
        </div>
        <div className="flex gap-3">
          <button className={`px-4 py-2 border rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${theme === 'dark'
              ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
              : 'border-slate-200 text-slate-900 hover:bg-slate-50'
            }`}>
            <Download className="w-4 h-4" />
            Download Health Report
          </button>
        </div>
      </div>
      <MetricsGrid theme={theme} patientData={patientData} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <MedicationsTable theme={theme} appointments={patientData?.recentAppointments || []} />
          <RefillTracker theme={theme} upcoming={patientData?.recentAppointments?.filter(a => a.status !== 'cancelled' && a.status !== 'completed') || []} />
        </div>
        <RightSidebar theme={theme} patientData={patientData} />
      </div>
    </div>
  );
}


function MessagesPage({ theme }) {
  const [activeChat, setActiveChat] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("chat");
  const [showChatListOnMobile, setShowChatListOnMobile] = useState(true);

  const currentDoctor = doctorsInfo[activeChat];

  const handleCall = () => setCurrentView("call");
  const handleVideoCall = () => setCurrentView("video");
  const handleCloseCall = () => setCurrentView("chat");

  const handleSelectChat = (id) => {
    setActiveChat(id);
    setCurrentView("chat");
    setShowChatListOnMobile(false); 
  };

  const handleBackClick = () => {
    setShowChatListOnMobile(true); 
  };

  return (
    <div className="flex flex-1 gap-6 h-[calc(100vh-130px)]">
      {}
      <ChatList
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        theme={theme}
        isVisible={showChatListOnMobile}
      />

      {}
      {currentView === "chat" && (
        <ChatWindow
          activeChatId={activeChat}
          onCall={handleCall}
          onVideoCall={handleVideoCall}
          theme={theme}
          onBackClick={handleBackClick}
          isMobileView={!showChatListOnMobile}
        />
      )}

      {currentView === "call" && currentDoctor && (
        <CallScreen
          doctor={{
            name: currentDoctor.name,
            specialty: currentDoctor.specialty,
            avatar: currentDoctor.avatar || "",
          }}
          onClose={handleCloseCall}
          theme={theme}
        />
      )}

      {currentView === "video" && currentDoctor && (
        <VideoCallScreen
          doctor={{
            name: currentDoctor.name,
            specialty: currentDoctor.specialty,
            avatar: currentDoctor.avatar || "",
          }}
          onClose={handleCloseCall}
          theme={theme}
        />
      )}
    </div>
  );
}

function AppointmentsPage({ theme }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API}/appointments/my-appointments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success || json.data) {
          setAppointments(json.data || []);
        }
      } catch (e) {
        console.error("Failed to load user appointments", e);
      } finally {
        setLoading(false);
      }
    };
    fetchApts();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h3 className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          My Appointments
        </h3>
        <p className={`mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          Manage your upcoming and past medical appointments.
        </p>
      </div>

      <div className={`rounded-3xl border p-6 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="py-16 text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <span className="text-2xl text-slate-400"><Calendar/></span>
            </div>
            <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No appointments found</h4>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>You haven't booked any appointments yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt, i) => (
              <div key={apt._id || i} className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${theme === 'dark' ? 'border-slate-700 hover:border-slate-600 bg-slate-800/50' : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                      apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                      apt.status === 'cancelled' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                    }`}>
                      {apt.status}
                    </span>
                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {apt.date} • {apt.time}
                    </span>
                  </div>
                  <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {apt.service}
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Provider ID: {apt.providerId} • Type: {apt.providerType}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${theme === 'dark' ? 'border-slate-600 text-white hover:bg-slate-700' : 'border-slate-200 text-slate-900 hover:bg-slate-100'}`}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Placeholder page for unbuilt sections ─── */
function PlaceholderPage({ title, theme }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="size-16 bg-[#50df20]/10 rounded-2xl flex items-center justify-center mb-4">
        <span className="text-[#50df20] text-2xl font-bold">{"?"}</span>
      </div>
      <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
      <p className={`max-w-md ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
        This section is under construction. Check back soon for updates.
      </p>
    </div>
  );
}

const pageTitles = {
  dashboard: "Dashboard",
  appointments: "Appointments",
  records: "Medical Records",
  prescriptions: "Prescriptions",
  billing: "Billing",
};

const API = 'http://localhost:5000/api';

export default function Page() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);

  const { theme } = useContext(ThemeContext) || { theme: "light" };
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPatientDashboard = async () => {
      setLoadingDashboard(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch(`${API}/appointments/patient-dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setPatientData(json.data);
        }
      } catch (e) {
        console.error('Failed to fetch patient dashboard', e);
      } finally {
        setLoadingDashboard(false);
      }
    };
    fetchPatientDashboard();
  }, []);

  function renderContent() {
    if (activePage === "dashboard") return <DashboardPage theme={theme} patientData={patientData} user={user} />;
    if (activePage === "settings") return <SettingsPage theme={theme} />;
    if (activePage === "messages") return <MessagesPage theme={theme} />;
    if (activePage === "appointments") return <AppointmentsPage theme={theme} />;
    if (activePage === "records") return <MedicalRecords theme={theme} />;
    if (activePage === "prescriptions") return <Prescriptions theme={theme} />;
    if (activePage === "billing") return <Billing theme={theme} />;
    return <PlaceholderPage title={pageTitles[activePage] || activePage} theme={theme} />;
  }

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-[#f6f8f6] text-slate-900'}`}>
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} theme={theme} />
      <div className="flex max-w-480 mx-auto min-h-[calc(100vh-60px)]">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          theme={theme}
        />
        <main className={`flex-1 overflow-y-auto ${activePage === "messages" ? "p-4 lg:p-6" : "p-4 lg:p-8"}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
