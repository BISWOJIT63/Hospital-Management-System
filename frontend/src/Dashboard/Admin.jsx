import React, { useState, useEffect } from "react";
import {
  Clock,
  ShieldCheck,
  FileCheck,
  HelpCircle,
  Activity,
  Loader2,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard";
import AddHospital from "./addingHospital/AddHospital";
import { api } from "../utils/api";

export default function Admin() {
  const [approved, setApproved] = useState(false);
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFacility = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        navigate("/login");
        return;
      }
      const data = await api.getMyFacility(token);
      setFacility(data.facility);
      if (data.facility?.status === "approved") setApproved(true);
    } catch (err) {
      console.error(err);
      if (
        err.message.includes("Not authorized") ||
        err.message.includes("jwt")
      ) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacility();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#080d1a] flex items-center justify-center">
        <Loader2 className="animate-spin text-green-500" size={40} />
      </div>
    );
  }

  if (!facility) {
    return <AddHospital onSuccess={() => fetchFacility()} />;
  }

  if (approved || facility.status === "approved") {
    return <AdminDashboard initialFac={facility} />;
  }

  return (
    <div className="min-h-screen df bg-slate-50 dark:bg-[#080d1a] font-sans flex items-center justify-center p-4 selection:bg-green-500/30">
      <div className="max-w-2xl w-full">
        <div className="flex justify-center mb-8 animation-float">
          <div className="bg-amber-100 dark:bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-200 dark:border-green-500/30 px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-lg shadow-amber-500/10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-sm font-black uppercase tracking-widest">
              Application Under Review
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden text-center relative">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-10 pb-12 border-b border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            />

            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-500/20 dark:to-green-500/10 border border-green-200 dark:border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner rotation-slow">
                <Clock
                  size={40}
                  className="text-green-600 dark:text-green-400"
                />
              </div>

              <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-3">
                Account Verification Pending
              </h1>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you for registering{" "}
                <strong className="text-slate-700 dark:text-slate-300">
                  {facility?.name || "your facility"}
                </strong>
                . Our team is currently verifying your credentials.
              </p>
            </div>
          </div>

          { }
          <div className="p-8 pb-10">
            <div className="max-w-md mx-auto space-y-6">
              {[
                {
                  icon: FileCheck,
                  title: "Application Submitted",
                  desc: "All required documents received.",
                  status: "done",
                  color: "emerald",
                },
                {
                  icon: ShieldCheck,
                  title: "Final Approval",
                  desc: "Dashboard access granted.",
                  status: "waiting",
                  color: "slate",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col relative w-full items-start group"
                >
                  <div className="flex items-center gap-4 w-full text-left relative z-10">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2 transition-all duration-500
                      ${step.status === "done"
                          ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                          : step.status === "current"
                            ? "bg-green-50 dark:bg-green-500/10 border-green-500 text-green-600 dark:text-green-400 shadow-lg shadow-green-500/20"
                            : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400"
                        }`}
                    >
                      <step.icon
                        size={20}
                        className={
                          step.status === "current" ? "animate-pulse" : ""
                        }
                      />
                    </div>

                    <div
                      className={`flex-1 ${step.status === "waiting" ? "opacity-50" : "opacity-100"}`}
                    >
                      <h3
                        className={`text-base font-black mb-0.5 ${step.status === "done" ? "text-emerald-700 dark:text-emerald-400" : step.status === "current" ? "text-green-900 dark:text-green-300" : "text-slate-600 dark:text-slate-500"}`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {step.desc}
                      </p>
                    </div>

                    {step.status === "done" && (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                        <Check
                          size={12}
                          className="text-emerald-600 dark:text-emerald-400"
                          strokeWidth={3}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition">
                <HelpCircle size={16} /> Contact Support
              </button>

              { }
              <button
                onClick={() => setApproved(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2"
              >
                Skip Approval (Dev){" "}
                <span className="text-lg leading-none">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

