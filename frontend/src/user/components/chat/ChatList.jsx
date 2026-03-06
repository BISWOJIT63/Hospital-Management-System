import { Search, Headset } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiology",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk0iivX4TdzdXjv847Jjh5JPhB8-YSRNFVUiArtxMAN2_yfDl3vvx8-ju2VmzC20eDQ7Fm_BxzWXcgfa6A7sHBzU0FJ92TdhFuqIObh50Piq5V0XGydYisV_GcBKHobZ1RGvrCsA0IfIEoinGW3YOC6WOgHL0RMYg9tHdADq4O7LdxVVvfxPnloZsUg0Ls-DE6laKqP3l7FvYLVpdpSKJ7b5cNYoFvxgMsi62hjBybvdvvTEzx8c0rxq8KtSGb-n9HLldHO0RHlww",
    lastMessage: "Typing...",
    time: "10:24 AM",
    online: true,
    isTyping: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "General Medicine",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5fymrqkZxfWbHjWGemXIBzEjILEUyp_PlUw5BiOSPXoo1SozyHkXcsogtwFQ0PRbuNhx3Aoj1ip1KH1QqtfDIRliQM1Oj8LrnUgGZ8xc2dU9H0wQYiDbEM9OrO2MPng0f_zdnCyjYwjeQ7OCU5K-cYiN9OfGOete91TFCuPgrMw9QEv3kIhHoZOFhSozkYruZF-yHk0C72TvqmysTzoshuGZxLXLAHoDlULWj33ADTFeOT2UnIm2KZKyzD934mwDRk-L1bE0b8Rk",
    lastMessage: "Your blood work results are ready for review.",
    time: "Yesterday",
    online: false,
    isTyping: false,
  },
  {
    id: 3,
    name: "Billing Support",
    specialty: "Support",
    avatar: null,
    lastMessage: "Invoice #882 has been processed.",
    time: "Monday",
    online: false,
    isTyping: false,
  },
];

export default function ChatList({ activeChat, onSelectChat, searchQuery, onSearchChange, theme, isVisible = true }) {
  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-80 flex flex-col glass-effect rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 ${!isVisible ? 'hidden md:flex' : 'flex'}`}>
      {}
      <div className={`p-4 border-b border-[#50df20]/10 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'}`}>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
          <input
            className={`w-full border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#50df20]/30 outline-none transition-colors ${
              theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-50'
            }`}
            placeholder="Search conversations..."
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {}
      <div className={`flex-1 overflow-y-auto custom-scrollbar ${theme === 'dark' ? 'bg-slate-800/30' : 'bg-white/30'}`}>
        <div className="p-2 space-y-1">
          {filtered.map((convo) => {
            const isActive = activeChat === convo.id;
            return (
              <button
                key={convo.id}
                onClick={() => onSelectChat(convo.id)}
                className={`flex items-center gap-3 p-3 w-full rounded-xl transition-colors text-left ${
                  isActive
                    ? "bg-[#50df20]/10 border border-[#50df20]/20"
                    : `border border-transparent ${theme === 'dark' ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'}`
                }`}
              >
                <div className="relative shrink-0">
                  {convo.avatar ? (
                    <img
                      alt={`${convo.name} profile`}
                      className="w-12 h-12 rounded-full object-cover"
                      crossOrigin="anonymous"
                      src={convo.avatar}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#50df20]/20 flex items-center justify-center text-[#50df20]">
                      <Headset className="w-5 h-5" />
                    </div>
                  )}
                  {convo.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#50df20] border-2 border-white rounded-full" />
                  )}
                  {!convo.online && convo.avatar && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-slate-300 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className={`text-sm font-bold truncate ${theme === 'dark' ? (isActive ? 'text-white' : 'text-slate-200') : (isActive ? 'text-slate-900' : 'text-slate-900')}`}>
                      {convo.name}
                    </h3>
                    <span className={`text-[10px] font-medium shrink-0 ml-2 ${isActive ? "text-[#50df20]" : theme === 'dark' ? "text-slate-500" : "text-slate-400"}`}>
                      {convo.time}
                    </span>
                  </div>
                  <p className={`text-xs line-clamp-1 ${convo.isTyping ? (theme === 'dark' ? "text-slate-400 font-medium italic" : "text-slate-600 font-medium italic") : theme === 'dark' ? "text-slate-400" : "text-slate-500"}`}>
                    {convo.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { conversations };
