import React from "react";
import { Check } from "lucide-react";
const Membership = ({DOCTOR}) => {
  return (
    <div>
      <section
        id="memberships"
        className="bg-white dark:bg-slate-950 dark:border-slate-700 p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-36"
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100  mb-6">Memberships</h2>
        <ul className="space-y-4">
          {DOCTOR.memberships.map((membership, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <div className="mt-0.5 bg-green-100 p-1 rounded-full shrink-0">
                <Check className="w-3.5 h-3.5 text-green-600" />
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {membership}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Membership;
