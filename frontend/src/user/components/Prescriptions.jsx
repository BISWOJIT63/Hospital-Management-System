import { useState, useEffect } from "react";
import { Pill, Calendar, User, Clock, AlertCircle } from "lucide-react";

export default function Prescriptions({ theme }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const res = await fetch(
          `${API_URL}/patient-data/prescriptions/my-prescriptions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const json = await res.json();
        if (json.success) setPrescriptions(json.data);
      } catch (e) {
        console.error("Failed to load prescriptions", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h3
          className={`text-3xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}
        >
          Prescriptions
        </h3>
        <p
          className={`mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
        >
          Track your medications, dosages, and refill schedules.
        </p>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : prescriptions.length === 0 ? (
          <div
            className={`p-12 text-center rounded-3xl border ${theme === "dark" ? "bg-slate-800/50 border-slate-700" : "bg-white border-slate-200"}`}
          >
            <Pill className="w-12 h-12 mx-auto mb-4 text-slate-400 opacity-20" />
            <h4
              className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
            >
              No prescriptions found
            </h4>
            <p className="text-slate-500">
              Active medications from your doctor will appear here.
            </p>
          </div>
        ) : (
          prescriptions.map((px) => (
            <div
              key={px._id}
              className={`overflow-hidden rounded-3xl border transition-all ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
            >
              <div className="p-6 border-b border-inherit bg-slate-50/50 dark:bg-slate-900/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Clock className="w-5 h-5 text-green-500" />
                    </div>
                    <span
                      className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                    >
                      {px.status === "active"
                        ? "Current Medication"
                        : "Past Medication"}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />{" "}
                      {new Date(px.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />{" "}
                      {px.doctorId ? px.doctorId.name : "Unknown Dr."}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {px.medications.map((med, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border ${theme === "dark" ? "bg-slate-900/50 border-slate-700" : "bg-slate-50 border-slate-100"}`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <Pill className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h5
                            className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                          >
                            {med.name}
                          </h5>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                            {med.dosage}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Frequency</span>
                          <span
                            className={`font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                          >
                            {med.frequency}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Duration</span>
                          <span
                            className={`font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                          >
                            {med.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {px.instructions && (
                  <div
                    className={`mt-6 p-4 rounded-2xl flex gap-3 ${theme === "dark" ? "bg-amber-500/10 text-amber-200" : "bg-amber-50 text-amber-700"}`}
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{px.instructions}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
