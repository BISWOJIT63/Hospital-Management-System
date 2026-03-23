import { useState, useEffect } from "react";
import { FileText, Calendar, User, Download, Plus } from "lucide-react";

export default function MedicalRecords({ theme }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${API_URL}/patient-data/medical-records/my-records`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success) setRecords(json.data);
      } catch (e) {
        console.error("Failed to load medical records", e);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Medical Records
          </h3>
          <p className={`mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Access your comprehensive health history and clinical notes.
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm">
          <Plus className="w-4 h-4" />
          Request New Record
        </button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : records.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
            <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400 opacity-20" />
            <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No records found</h4>
            <p className="text-slate-500">Your clinical records will appear here after your appointments.</p>
          </div>
        ) : (
          records.map((record) => (
            <div key={record._id} className={`p-6 rounded-3xl border transition-all hover:shadow-md ${theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-2xl h-fit ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <FileText className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {record.diagnosis}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {record.doctorId ? `Dr. ${record.doctorId.name}` : 'General Clinic'}
                      </span>
                    </div>
                    <p className={`mt-4 text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {record.notes}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <button className={`p-2.5 rounded-xl border transition-colors ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-700 text-slate-300' : 'border-slate-100 hover:bg-slate-50 text-slate-600'}`}>
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
