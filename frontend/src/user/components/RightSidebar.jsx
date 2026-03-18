import { Lightbulb, Brain, CalendarClock, TrendingUp } from "lucide-react";

function StatsCard({ patientData, theme }) {
  const rate = patientData?.total > 0
    ? Math.round((patientData.completed / patientData.total) * 100)
    : 0;

  return (
    <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} shadow-sm`}>
      <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-400'}`}>
        Health Overview
      </h4>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Completion Rate</span>
            <span className="text-sm font-bold text-emerald-600">{rate}%</span>
          </div>
          <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-100'}`}>
            <div className="h-2 rounded-full bg-emerald-500 transition-all" style={{ width: `${rate}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-50'}`}>
            <p className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{patientData?.upcoming ?? 0}</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Upcoming</p>
          </div>
          <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-50'}`}>
            <p className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{patientData?.completed ?? 0}</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIInsights({ theme, patientData }) {
  const total = patientData?.total || 0;
  const upcoming = patientData?.upcoming || 0;
  const completed = patientData?.completed || 0;

  let message = "No appointment data yet. Book your first appointment to get personalized insights.";
  if (total > 0 && upcoming > 0) {
    message = `You have ${upcoming} upcoming appointment${upcoming > 1 ? 's' : ''}. Stay on top of your health schedule!`;
  } else if (completed > 0) {
    message = `You've completed ${completed} appointment${completed > 1 ? 's' : ''}. Keep up the great work staying healthy!`;
  }

  return (
    <div className={`p-6 rounded-xl border relative overflow-hidden ${theme === 'dark' ? 'bg-emerald-900/20 border-emerald-700/30' : 'bg-[#50df20]/5 border-[#50df20]/20'}`}>
      <div className="absolute -right-4 -top-4 opacity-10">
        <Brain className="w-24 h-24 text-[#50df20]" />
      </div>
      <h4 className="font-bold flex items-center gap-2 text-[#50df20] mb-3">
        <Lightbulb className="w-5 h-5" />
        Health Insight
      </h4>
      <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
        {message}
      </p>
    </div>
  );
}

function NextAppointment({ theme, patientData }) {
  const next = patientData?.recentAppointments?.find(a => a.status === 'confirmed' || a.status === 'pending');

  return (
    <div className={`p-6 rounded-xl shadow-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-zinc-900'} text-white`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#50df20] animate-pulse" />
        <h4 className="font-bold text-sm">Next Appointment</h4>
      </div>
      {next ? (
        <>
          <p className="text-2xl font-black">{next.time}</p>
          <p className="text-xs text-zinc-400 mt-1">{next.service} • {next.date}</p>
          <p className="text-xs text-zinc-400 mt-0.5">{next.providerName}</p>
        </>
      ) : (
        <p className="text-sm text-zinc-400">No upcoming appointments scheduled.</p>
      )}
    </div>
  );
}

export default function RightSidebar({ theme, patientData }) {
  return (
    <div className="space-y-6">
      <AIInsights theme={theme} patientData={patientData} />
      <StatsCard theme={theme} patientData={patientData} />
      <NextAppointment theme={theme} patientData={patientData} />
    </div>
  );
}
