import { useState, useEffect } from "react";
import { Download } from "lucide-react";


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


function SettingsPage({ theme }) {
  return (
    <div className="space-y-8">
      <ProfileHero theme={theme} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PersonalInfo theme={theme} />
          <EmergencyContact theme={theme} />
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


function PrescriptionsPage({ theme }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className={`text-3xl font-black tracking-tight text-balance ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Prescription Dashboard
          </h3>
          <p className={`mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Real-time medication monitoring and AI-powered adherence tracking.
          </p>
        </div>
        <div className="flex gap-3">
          <button className={`px-4 py-2 border rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${theme === 'dark'
              ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
              : 'border-slate-200 text-slate-900 hover:bg-slate-50'
            }`}>
            <Download className="w-4 h-4" />
            Download PDF Report
          </button>
        </div>
      </div>
      <MetricsGrid theme={theme} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <MedicationsTable theme={theme} />
          <RefillTracker theme={theme} />
        </div>
        <RightSidebar theme={theme} />
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
  billing: "Billing",
};


import { useContext } from "react";
import { ThemeContext } from "../../components/context/ThemeContext";

export default function Page() {
  const [activePage, setActivePage] = useState("settings");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  const { theme } = useContext(ThemeContext) || { theme: "light" };

  function renderContent() {
    if (activePage === "settings") return <SettingsPage theme={theme} />;
    if (activePage === "prescriptions") return <PrescriptionsPage theme={theme} />;
    if (activePage === "messages") return <MessagesPage theme={theme} />;
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
