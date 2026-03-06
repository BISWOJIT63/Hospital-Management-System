import { Pill, MoreVertical, ListFilter } from "lucide-react";

const medications = [
  {
    name: "Amoxicillin",
    category: "Antibiotic",
    dosage: "500mg",
    frequency: "Twice daily, Morning/Evening",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    dotColor: "bg-green-500",
    refills: "2 Remaining",
    pillBg: "bg-[#50df20]/10 text-[#50df20]",
    action: "more",
  },
  {
    name: "Lisinopril",
    category: "Blood Pressure",
    dosage: "10mg",
    frequency: "Once daily, Morning",
    status: "Refill Pending",
    statusColor: "bg-amber-100 text-amber-700",
    dotColor: "bg-amber-500",
    refills: "0 Remaining",
    pillBg: "bg-green-100 text-green-500",
    action: "request",
  },
  {
    name: "Metformin",
    category: "Diabetes Management",
    dosage: "850mg",
    frequency: "After meals, Twice daily",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    dotColor: "bg-green-500",
    refills: "5 Remaining",
    pillBg: "bg-emerald-100 text-emerald-500",
    action: "more",
  },
];

export default function MedicationsTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <h4 className="font-bold text-lg text-slate-900">
          Current Medications
        </h4>
        <div className="flex gap-2">
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
            <ListFilter className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4">Medication</th>
              <th className="px-6 py-4">{"Dosage & Frequency"}</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Refills</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {medications.map((med) => (
              <tr
                key={med.name}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${med.pillBg}`}
                    >
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{med.name}</p>
                      <p className="text-xs text-slate-500">{med.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-slate-900">
                    {med.dosage}
                  </p>
                  <p className="text-xs text-slate-500">{med.frequency}</p>
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${med.statusColor}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${med.dotColor}`}
                    />
                    {med.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-slate-700">
                    {med.refills}
                  </p>
                </td>
                <td className="px-6 py-5 text-right">
                  {med.action === "more" ? (
                    <button className="text-slate-400 hover:text-[#50df20] transition-colors cursor-pointer">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="text-[#50df20] font-bold text-xs uppercase tracking-wider hover:underline cursor-pointer">
                      Request Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
