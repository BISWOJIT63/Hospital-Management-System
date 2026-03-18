import { useState, useEffect } from "react";
import { Receipt, Calendar, CreditCard, CheckCircle2, AlertCircle, Eye, Download } from "lucide-react";

export default function Billing({ theme }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/patient-data/billing/my-invoices', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success) setInvoices(json.data);
      } catch (e) {
        console.error("Failed to load invoices", e);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const totalOutstanding = invoices
    .filter(inv => inv.paymentStatus === 'pending')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Billing & Invoices
          </h3>
          <p className={`mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Manage your payments, insurance claims, and billing history.
          </p>
        </div>
        <div className={`px-6 py-4 rounded-2xl border text-right ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Outstanding</p>
          <p className="text-2xl font-black text-rose-500">${totalOutstanding.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : invoices.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
            <Receipt className="w-12 h-12 mx-auto mb-4 text-slate-400 opacity-20" />
            <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No invoices found</h4>
            <p className="text-slate-500">Your billing history will appear here after your appointments.</p>
          </div>
        ) : (
          invoices.map((inv) => (
            <div key={inv._id} className={`p-5 rounded-3xl border transition-all hover:shadow-md ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-2xl h-fit ${inv.paymentStatus === 'paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {inv.invoiceNumber}
                      </h4>
                      <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md ${
                        inv.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                      }`}>
                        {inv.paymentStatus}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(inv.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> {inv.paymentMethod}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                       {inv.items.map((item, i) => (
                         <span key={i} className={`text-xs px-2.5 py-1 rounded-lg ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                           {item.description}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</p>
                    <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>${inv.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className={`p-2.5 rounded-xl border transition-colors ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-700 text-slate-300' : 'border-slate-100 hover:bg-slate-50 text-slate-600'}`}>
                      <Eye className="w-5 h-5" />
                    </button>
                    {inv.paymentStatus === 'pending' ? (
                      <button className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-sm transition-all">
                        Pay Now
                      </button>
                    ) : (
                      <button className={`p-2.5 rounded-xl border transition-colors ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-700 text-slate-300' : 'border-slate-100 hover:bg-slate-50 text-slate-600'}`}>
                        <Download className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
