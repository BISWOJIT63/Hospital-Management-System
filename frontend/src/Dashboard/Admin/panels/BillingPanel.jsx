import React, { useState } from "react";
import {
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Eye,
  Printer,
  X,
  Check,
} from "lucide-react";
import {
  Card,
  SectionHdr,
  SearchBar,
  StatCard,
  Avatar,
  StatusBadge,
} from "../components/AdminUI";
import { api } from "../../../utils/api";

export default function BillingPanel() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await api.getMyAppointments();
        if (res.success || res.data) {
          const raw = res.data || res;
          const formatted = raw.map(b => ({
            id: `INV-${(b._id || '').slice(-6).toUpperCase()}`,
            rawId: b._id,
            patient: b.patientId?.name || "Unknown Patient",
            doctor: b.providerType === 'Doctor' ? 'Doctor View' : 'Facility View',
            date: b.date,
            amount: "$150.00", 
            status: b.status === "confirmed" ? "paid" : "pending",
            prescription: b.notes || "No additional notes provided.",
            items: [
              { desc: b.service, qty: 1, rate: 150 }
            ]
          }));
          setBills(formatted);
        }
      } catch (e) {
        console.error("Failed to load bills", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  const filtered = bills.filter(
    (b) =>
      !search ||
      b.patient.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()),
  );

  const setStatus = async (id, s) => {
    const targetBill = bills.find(b => b.id === id);
    if (!targetBill) return;
    try {
      const realStatus = s === "paid" ? "confirmed" : s;
      const res = await api.updateAppointmentStatus(targetBill.rawId, realStatus);
      if (res.success || res.status) {
        setBills((bb) => bb.map((b) => (b.id === id ? { ...b, status: s } : b)));
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const total = bills.reduce(
    (a, b) => a + parseFloat(b.amount.replace(/[$,]/g, "")),
    0,
  );
  const paid = bills
    .filter((b) => b.status === "paid")
    .reduce((a, b) => a + parseFloat(b.amount.replace(/[$,]/g, "")), 0);

  /* Print-friendly invoice */
  const printInvoice = (bill) => {
    const html = `<!DOCTYPE html><html><head><title>${bill.id}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
      body{padding:40px;color:#1e293b;font-size:14px}
      .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;padding-bottom:20px;border-bottom:2px solid #6366f1}
      .logo{font-size:22px;font-weight:900;color:#6366f1}
      .logo span{display:block;font-size:12px;color:#64748b;font-weight:500;margin-top:2px}
      .inv-num{text-align:right}
      .inv-num h2{font-size:28px;font-weight:900;color:#6366f1}
      .inv-num p{font-size:12px;color:#64748b;margin-top:4px}
      .section{margin-bottom:24px}
      .section h3{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:8px}
      .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
      .info-box{background:#f8fafc;border-radius:10px;padding:12px 16px;border:1px solid #e2e8f0}
      .info-box label{font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;display:block;margin-bottom:3px}
      .info-box p{font-size:14px;font-weight:700;color:#1e293b}
      table{width:100%;border-collapse:collapse;margin-top:8px}
      th{background:#f8fafc;padding:10px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;color:#94a3b8;border-bottom:1px solid #e2e8f0}
      td{padding:12px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#374151}
      .total-row td{font-weight:900;color:#6366f1;font-size:15px;border-bottom:none;border-top:2px solid #6366f1}
      .prescription{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 16px;margin-top:8px}
      .prescription label{font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;display:block;margin-bottom:4px}
      .prescription p{font-size:13px;color:#1e40af}
      .badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700}
      .paid{background:#d1fae5;color:#065f46}
      .pending{background:#fef3c7;color:#92400e}
      .footer{margin-top:32px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #f1f5f9;padding-top:16px}
    </style></head><body>
    <div class="header">
      <div class="logo">🏥 Meridian General Hospital<span>42 Wellness Blvd, Manhattan, New York, NY 10001 · +1 (212) 555-0192</span></div>
      <div class="inv-num"><h2>INVOICE</h2><p>${bill.id}</p><p>Date: ${bill.date}</p><span class="badge ${bill.status}">${bill.status.toUpperCase()}</span></div>
    </div>
    <div class="info-grid section">
      <div class="info-box"><label>Patient</label><p>${bill.patient}</p></div>
      <div class="info-box"><label>Attending Physician</label><p>${bill.doctor}</p></div>
    </div>
    <div class="section">
      <h3>Services Rendered</h3>
      <table><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
      <tbody>${bill.items.map((it) => `<tr><td>${it.desc}</td><td>${it.qty}</td><td>$${it.rate.toLocaleString()}</td><td>$${(it.qty * it.rate).toLocaleString()}</td></tr>`).join("")}
      <tr class="total-row"><td colspan="3">TOTAL DUE</td><td>${bill.amount}</td></tr></tbody></table>
    </div>
    <div class="section">
      <h3>Prescription / Medical Notes</h3>
      <div class="prescription"><label>Prescribed by ${bill.doctor}</label><p>${bill.prescription}</p></div>
    </div>
    <div class="footer">Thank you for choosing Meridian General Hospital · For billing queries: billing@meridianhospital.com · +1 (212) 555-0199</div>
    </body></html>`;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  };

  return (
    <div className="flex flex-col gap-5">
      {preview && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl p-7 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-black text-slate-800 dark:text-white text-lg">
                  {preview.id}
                </h3>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  {preview.date}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => printInvoice(preview)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-500 transition"
                >
                  <Printer size={14} />
                  Print / PDF
                </button>
                <button
                  onClick={() => setPreview(null)}
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                ["Patient", preview.patient],
                ["Doctor", preview.doctor],
                ["Date", preview.date],
                ["Status", <StatusBadge status={preview.status} />],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800"
                >
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
                    {l}
                  </p>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800">
                    <th className="text-left px-4 py-2.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500">
                      Service
                    </th>
                    <th className="text-right px-4 py-2.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500">
                      Qty
                    </th>
                    <th className="text-right px-4 py-2.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500">
                      Rate
                    </th>
                    <th className="text-right px-4 py-2.5 text-xs font-black uppercase text-slate-400 dark:text-slate-500">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {preview.items.map((it, i) => (
                    <tr
                      key={i}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">
                        {it.desc}
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-500 dark:text-slate-400">
                        {it.qty}
                      </td>
                      <td className="px-4 py-2.5 text-right text-slate-500 dark:text-slate-400">
                        ${it.rate.toLocaleString()}
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-slate-800 dark:text-slate-200">
                        ${(it.qty * it.rate).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10">
                    <td
                      colSpan="3"
                      className="px-4 py-3 font-black text-green-700 dark:text-green-400"
                    >
                      TOTAL DUE
                    </td>
                    <td className="px-4 py-3 text-right font-black text-green-700 dark:text-green-400 text-base">
                      {preview.amount}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-4">
              <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                Prescription / Notes
              </p>
              <p className="text-sm text-green-800 dark:text-green-300">
                {preview.prescription}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={DollarSign}
          label="Total Billed"
          value={`$${(total / 1000).toFixed(1)}k`}
          sub="All invoices"
          color="green"
          trend="+12%"
        />
        <StatCard
          icon={CheckCircle2}
          label="Collected"
          value={`$${(paid / 1000).toFixed(1)}k`}
          sub="Paid invoices"
          color="teal"
        />
        <StatCard
          icon={AlertCircle}
          label="Outstanding"
          value={`$${((total - paid) / 1000).toFixed(1)}k`}
          sub="Pending payment"
          color="rose"
        />
      </div>

      <Card>
        <SectionHdr
          icon={Receipt}
          title="Invoices & Billing"
          sub={`${filtered.length} records`}
        >
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search patient or invoice…"
          />
        </SectionHdr>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm min-w-[620px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                {[
                  "Invoice",
                  "Patient",
                  "Doctor",
                  "Date",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 pb-3 pr-4 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <tr
                  key={b.id}
                  className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 pr-4">
                    <span className="text-xs font-black text-green-600 dark:text-green-400">
                      {b.id}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={b.patient} size="sm" grad={i} />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {b.patient}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-slate-500 dark:text-slate-400 whitespace-nowrap text-xs">
                    {b.doctor}
                  </td>
                  <td className="py-3 pr-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {b.date}
                  </td>
                  <td className="py-3 pr-4 font-black text-slate-800 dark:text-slate-200">
                    {b.amount}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPreview(b)}
                        className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg px-2.5 py-1.5 hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                      >
                        <Eye size={11} />
                        View
                      </button>
                      <button
                        onClick={() => printInvoice(b)}
                        className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <Printer size={11} />
                        PDF
                      </button>
                      {b.status !== "paid" && (
                        <button
                          onClick={() => setStatus(b.id, "paid")}
                          className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg px-2.5 py-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition"
                        >
                          <Check size={11} />
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
