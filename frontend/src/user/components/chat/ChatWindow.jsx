import { useState, useRef, useEffect, useCallback } from "react";
import {
  Video,
  Phone,
  MoreVertical,
  Paperclip,
  ImageIcon,
  Send,
  Lock,
  Calendar,
  Check,
  CheckCheck,
  Smile,
  Pin,
  Mic,
  ArrowLeft,
} from "lucide-react";
import MoreMenu from "./MoreMenu";
import ContactInfo from "./ContactInfo";
import SearchChat from "./SearchChat";
import PinnedMessages from "./PinnedMessages";
import Gallery from "./Gallery";
import MessageContextMenu from "./MessageContextMenu";

const messagesData = {
  1: [
    {
      id: 1,
      sender: "doctor",
      text: "Hello James, I've reviewed your latest heart rate data from your smartwatch. The readings look much more stable this week.",
      time: "09:15 AM",
      read: true,
    },
    {
      id: 2,
      sender: "me",
      text: "That's great news! I've been feeling much better since we adjusted the medication dosage. No more dizziness during my morning walks.",
      time: "09:42 AM",
      read: true,
    },
    {
      id: 3,
      sender: "doctor",
      text: "I'm very glad to hear that. I'd like to see you for a quick follow-up next Tuesday at 2 PM just to do a physical check. Does that work for you?",
      time: "10:02 AM",
      read: true,
    },
    {
      id: 4,
      sender: "doctor",
      type: "appointment",
      text: "Appointment Request",
      subtitle: "Oct 24, 2023 at 2:00 PM",
      time: "10:02 AM",
      read: true,
    },
    {
      id: 5,
      sender: "me",
      text: "Yes, that works perfectly. I'll also bring the log of my blood pressure readings.",
      time: "10:15 AM",
      read: true,
    },
    {
      id: 6,
      sender: "doctor",
      text: "Perfect. Also, please continue monitoring your heart rate daily and log any irregularities. We'll review everything together.",
      time: "10:30 AM",
      read: true,
    },
  ],
  2: [
    {
      id: 1,
      sender: "doctor",
      text: "Good morning James. Your blood work results from last Friday have come in. Everything looks within normal range.",
      time: "3:40 PM",
      read: true,
    },
    {
      id: 2,
      sender: "me",
      text: "That's a relief, thank you Dr. Chen! Anything I should keep an eye on?",
      time: "4:12 PM",
      read: true,
    },
    {
      id: 3,
      sender: "doctor",
      text: "Your vitamin D levels are slightly low. I'd recommend a daily supplement of 2000 IU. I've attached the full report for your records.",
      time: "4:30 PM",
      read: true,
    },
  ],
  3: [
    {
      id: 1,
      sender: "doctor",
      text: "Hello! Your insurance claim for visit #A-104-Sept has been approved and Invoice #882 has been processed successfully.",
      time: "9:00 AM",
      read: true,
    },
    {
      id: 2,
      sender: "me",
      text: "Thank you for the update. When should I expect the reimbursement?",
      time: "11:30 AM",
      read: true,
    },
  ],
};

const doctorsInfo = {
  1: {
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiology Resident",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdWNrzqddMZvBta3XLrYiR9GYEJcEVmBgdSSIHPeZmgGrzlkkCI50LDBZqlDrGEtKRkHRvEJbf0ULlvkn9SK2z4SwB2LYXg2vmSPhAwijT53pL79NODT1nlBkRsIWEuXRDKHVky-1V7FS9RE_HFILSaJ9ydmcDEAIYw5PxKp_mdFSG0TyS0BtBEZs7qiQdegQUqmqUWhpfCDF3WIPTb0znALMVQA5E2wm1Im1kwx1FqC57639BdL33cfvvLRkxTaYWNKZgoZZoggk",
    online: true,
    isTyping: true,
  },
  2: {
    name: "Dr. Michael Chen",
    specialty: "General Medicine",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5fymrqkZxfWbHjWGemXIBzEjILEUyp_PlUw5BiOSPXoo1SozyHkXcsogtwFQ0PRbuNhx3Aoj1ip1KH1QqtfDIRliQM1Oj8LrnUgGZ8xc2dU9H0wQYiDbEM9OrO2MPng0f_zdnCyjYwjeQ7OCU5K-cYiN9OfGOete91TFCuPgrMw9QEv3kIhHoZOFhSozkYruZF-yHk0C72TvqmysTzoshuGZxLXLAHoDlULWj33ADTFeOT2UnIm2KZKyzD934mwDRk-L1bE0b8Rk",
    online: false,
    isTyping: false,
  },
  3: {
    name: "Billing Support",
    specialty: "Support Team",
    avatar: null,
    online: false,
    isTyping: false,
  },
};

export default function ChatWindow({ activeChatId, onCall, onVideoCall, theme, onBackClick, isMobileView }) {
  const [messages, setMessages] = useState(messagesData);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [appointmentAccepted, setAppointmentAccepted] = useState(false);
  const [pinnedIds, setPinnedIds] = useState({ 1: new Set(), 2: new Set(), 3: new Set() });
  const chatEndRef = useRef(null);

  // Overlay states
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [highlightedMsgId, setHighlightedMsgId] = useState(null);

  // Context menu
  const [contextMenu, setContextMenu] = useState(null); 

  const doctor = doctorsInfo[activeChatId];
  const chatMessages = messages[activeChatId] || [];
  const currentPinned = pinnedIds[activeChatId] || new Set();
  const pinnedMessages = chatMessages.filter((m) => currentPinned.has(m.id));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  
  useEffect(() => {
    setShowContactInfo(false);
    setShowSearch(false);
    setShowPinned(false);
    setShowGallery(false);
    setMenuOpen(false);
    setContextMenu(null);
    setHighlightedMsgId(null);
  }, [activeChatId]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      read: false,
    };
    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg],
    }));
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const togglePin = useCallback(
    (msgId) => {
      setPinnedIds((prev) => {
        const updated = { ...prev };
        const set = new Set(updated[activeChatId] || []);
        if (set.has(msgId)) {
          set.delete(msgId);
        } else {
          set.add(msgId);
        }
        updated[activeChatId] = set;
        return updated;
      });
    },
    [activeChatId]
  );

  const handleCopyMessage = (msgId) => {
    const msg = chatMessages.find((m) => m.id === msgId);
    if (msg?.text) {
      navigator.clipboard.writeText(msg.text);
    }
  };

  const handleDeleteMessage = (msgId) => {
    setMessages((prev) => ({
      ...prev,
      [activeChatId]: (prev[activeChatId] || []).filter((m) => m.id !== msgId),
    }));
  };

  const handleContextMenu = (e, msgId) => {
    e.preventDefault();
    setContextMenu({ msgId, x: e.clientX, y: e.clientY });
  };

  const handleMenuAction = (actionId) => {
    switch (actionId) {
      case "contact":
        setShowContactInfo(true);
        break;
      case "search":
        setShowSearch(true);
        break;
      case "pinned":
        setShowPinned(true);
        break;
      case "gallery":
        setShowGallery(true);
        break;
      case "mute":
        break;
      case "wallpaper":
        break;
      case "clear":
        setMessages((prev) => ({
          ...prev,
          [activeChatId]: [],
        }));
        break;
      default:
        break;
    }
  };

  const hasInput = inputValue.trim().length > 0;

  return (
    <div className={`flex-1 flex flex-col glass-effect rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 relative ${isMobileView ? 'flex' : 'hidden md:flex'}`}>
      {}
      <div className={`p-4 px-6 border-b border-[#50df20]/10 flex items-center justify-between transition-colors ${theme === 'dark' ? 'bg-slate-800/40' : 'bg-white/40'}`}>
        {isMobileView && (
          <button
            onClick={onBackClick}
            className={`p-2 rounded-lg transition-colors md:hidden ${theme === 'dark' ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
            aria-label="Back to chats"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => setShowContactInfo(true)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            {doctor.avatar ? (
              <img
                alt={doctor.name}
                className="w-10 h-10 rounded-full object-cover"
                crossOrigin="anonymous"
                src={doctor.avatar}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#50df20]/20 flex items-center justify-center text-[#50df20] font-bold text-sm">
                BS
              </div>
            )}
            {doctor.online && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#50df20] border-2 border-white rounded-full" />
            )}
          </div>
          <div className="text-left">
            <h3 className={`text-sm font-bold leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{doctor.name}</h3>
            <p className="text-xs text-[#50df20] font-medium mt-1 uppercase tracking-tight">
              {doctor.isTyping ? "Typing..." : doctor.online ? `Active ${doctor.specialty}` : doctor.specialty}
            </p>
          </div>
        </button>
        <div className="flex items-center gap-1.5">
          {}
          {pinnedMessages.length > 0 && (
            <button
              onClick={() => setShowPinned(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[#50df20] bg-[#50df20]/10 hover:bg-[#50df20]/15 rounded-lg transition-all mr-1"
              aria-label="View pinned messages"
            >
              <Pin className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">{pinnedMessages.length}</span>
            </button>
          )}
          <button
            onClick={onVideoCall}
            className="p-2 text-slate-400 hover:text-[#50df20] hover:bg-[#50df20]/10 rounded-lg transition-all"
            aria-label="Video call"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            onClick={onCall}
            className="p-2 text-slate-400 hover:text-[#50df20] hover:bg-[#50df20]/10 rounded-lg transition-all"
            aria-label="Voice call"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {}
      <MoreMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onAction={handleMenuAction}
      />

      {}
      {showSearch && (
        <SearchChat
          messages={chatMessages}
          onClose={() => {
            setShowSearch(false);
            setHighlightedMsgId(null);
          }}
          onHighlight={setHighlightedMsgId}
        />
      )}

      {}
      {pinnedMessages.length > 0 && !showSearch && (
        <button
          onClick={() => setShowPinned(true)}
          className="flex items-center gap-2.5 px-6 py-2.5 bg-[#50df20]/5 border-b border-[#50df20]/10 hover:bg-[#50df20]/10 transition-colors"
        >
          <Pin className="w-3.5 h-3.5 text-[#50df20]" />
          <span className="text-xs font-semibold text-slate-600 truncate flex-1 text-left">
            {pinnedMessages[pinnedMessages.length - 1].text}
          </span>
          <span className="text-[10px] font-bold text-[#50df20] bg-[#50df20]/10 px-2 py-0.5 rounded-full shrink-0">
            {pinnedMessages.length}
          </span>
        </button>
      )}

      {}
      <div className={`flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar transition-colors ${theme === 'dark' ? 'bg-slate-800' : 'bg-[#f0f4f0]'}`}>
        {}
        <div className="flex justify-center">
          <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${theme === 'dark' ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
            Today
          </span>
        </div>

        {chatMessages.map((msg) => {
          const isHighlighted = highlightedMsgId === msg.id;
          const isPinnedMsg = currentPinned.has(msg.id);

          if (msg.type === "appointment") {
            return (
              <div key={msg.id} className="flex items-start gap-3 max-w-[80%]">
                {doctor.avatar ? (
                  <img
                    alt={doctor.name}
                    className="w-8 h-8 rounded-full shrink-0 mt-1"
                    crossOrigin="anonymous"
                    src={doctor.avatar}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#50df20]/20 flex items-center justify-center text-[#50df20] shrink-0 mt-1 text-xs font-bold">
                    BS
                  </div>
                )}
                <div
                  onContextMenu={(e) => handleContextMenu(e, msg.id)}
                  className={`bg-white p-3 rounded-2xl rounded-tl-none border shadow-sm flex items-center gap-3 transition-all ${
                    isHighlighted
                      ? "border-[#50df20] bg-[#50df20]/5 ring-2 ring-[#50df20]/20"
                      : "border-[#50df20]/5"
                  }`}
                >
                  <div className="w-10 h-10 bg-[#50df20]/10 rounded-lg flex items-center justify-center text-[#50df20]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">{msg.text}</p>
                    <p className="text-[10px] text-slate-500">{msg.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setAppointmentAccepted(true)}
                    disabled={appointmentAccepted}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${
                      appointmentAccepted
                        ? "bg-[#50df20]/20 text-[#50df20] cursor-default"
                        : "bg-[#50df20] text-white hover:bg-[#50df20]/90"
                    }`}
                  >
                    {appointmentAccepted ? "ACCEPTED" : "ACCEPT"}
                  </button>
                </div>
              </div>
            );
          }

          if (msg.sender === "doctor") {
            return (
              <div key={msg.id} className="flex items-start gap-3 max-w-[80%]">
                {doctor.avatar ? (
                  <img
                    alt={doctor.name}
                    className="w-8 h-8 rounded-full shrink-0 mt-1"
                    crossOrigin="anonymous"
                    src={doctor.avatar}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#50df20]/20 flex items-center justify-center text-[#50df20] shrink-0 mt-1 text-xs font-bold">
                    BS
                  </div>
                )}
                <div
                  onContextMenu={(e) => handleContextMenu(e, msg.id)}
                  className={`relative bg-white p-4 rounded-2xl rounded-tl-none border shadow-sm transition-all group ${
                    isHighlighted
                      ? "border-[#50df20] bg-[#50df20]/5 ring-2 ring-[#50df20]/20"
                      : "border-[#50df20]/5"
                  }`}
                >
                  {isPinnedMsg && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#50df20] rounded-full flex items-center justify-center shadow-md">
                      <Pin className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                  <p className="text-sm text-slate-700 leading-relaxed">{msg.text}</p>
                  <span className="text-[10px] text-slate-400 mt-2 block">{msg.time}</span>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex items-start gap-3 flex-row-reverse ml-auto max-w-[80%]">
              <div
                onContextMenu={(e) => handleContextMenu(e, msg.id)}
                className={`relative bg-[#50df20] text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-[#50df20]/20 group transition-all ${
                  isHighlighted ? "ring-2 ring-white/60 brightness-110" : ""
                }`}
              >
                {isPinnedMsg && (
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Pin className="w-2.5 h-2.5 text-[#50df20]" />
                  </div>
                )}
                <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-2">
                  <span className="text-[10px] text-white/70">{msg.time}</span>
                  {msg.read ? (
                    <CheckCheck className="w-3 h-3 text-white/70" />
                  ) : (
                    <Check className="w-3 h-3 text-white/70" />
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {}
        {doctor.isTyping && (
          <div className="flex items-start gap-2 pt-2">
            <div className="bg-slate-100 px-3 py-2 rounded-full flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot" />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot" />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot" />
            </div>
            <span className="text-[10px] text-slate-400 italic self-center">
              {doctor.name.split(" ").pop()} is typing
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {}
      <div className={`p-4 border-t border-[#50df20]/10 transition-colors ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}`}>
        <div className={`flex items-center gap-3 border rounded-2xl p-2 pl-4 shadow-sm focus-within:border-[#50df20]/40 focus-within:ring-2 focus-within:ring-[#50df20]/10 transition-all ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'}`}>
          <button className="text-slate-400 hover:text-[#50df20] transition-colors" aria-label="Emoji">
            <Smile className="w-5 h-5" />
          </button>
          <button className="text-slate-400 hover:text-[#50df20] transition-colors" aria-label="Attach file">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            className="flex-1 border-none bg-transparent focus:ring-0 text-sm py-2 outline-none"
            placeholder="Type a secure message..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {hasInput ? (
            <button
              onClick={handleSend}
              className="bg-[#50df20] text-white w-10 h-10 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-[#50df20]/30 transition-all active:scale-95 hover:bg-[#44c91c]"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 -rotate-45 relative left-0.5" />
            </button>
          ) : (
            <button
              className="bg-slate-100 text-slate-400 w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-default"
              aria-label="Microphone"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="mt-2 flex items-center justify-center gap-1">
          <Lock className={`w-2.5 h-2.5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
          <span className={`text-[9px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            End-to-end encrypted messaging
          </span>
        </div>
      </div>

      {}
      {contextMenu && (
        <MessageContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          isPinned={currentPinned.has(contextMenu.msgId)}
          onClose={() => setContextMenu(null)}
          onPin={() => {
            togglePin(contextMenu.msgId);
            setContextMenu(null);
          }}
          onCopy={() => {
            handleCopyMessage(contextMenu.msgId);
            setContextMenu(null);
          }}
          onDelete={() => {
            handleDeleteMessage(contextMenu.msgId);
            setContextMenu(null);
          }}
        />
      )}

      {}
      {showContactInfo && (
        <ContactInfo
          doctor={doctor}
          onClose={() => setShowContactInfo(false)}
          pinnedCount={pinnedMessages.length}
          onOpenPinned={() => {
            setShowContactInfo(false);
            setShowPinned(true);
          }}
          onOpenGallery={() => {
            setShowContactInfo(false);
            setShowGallery(true);
          }}
        />
      )}

      {}
      {showPinned && (
        <PinnedMessages
          pinnedMessages={pinnedMessages}
          doctorName={doctor.name}
          onClose={() => setShowPinned(false)}
          onUnpin={(id) => togglePin(id)}
        />
      )}

      {}
      {showGallery && <Gallery onClose={() => setShowGallery(false)} />}
    </div>
  );
}

export { doctorsInfo };
