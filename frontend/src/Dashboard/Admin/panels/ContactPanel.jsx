import React from "react";
import { Phone, MapPin, Mail, Globe } from "lucide-react";
import { Card, SectionHdr } from "../components/AdminUI";

export default function ContactPanel({ fac }) {
  return (
    <Card>
      <SectionHdr
        icon={Phone}
        title="Contact Information"
        sub="How patients reach you"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          [
            Phone,
            "Primary Phone",
            fac.phone,
            "text-green-600 dark:text-green-400",
            "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20",
          ],
          [
            Phone,
            "Emergency Line",
            fac.emergency,
            "text-rose-600 dark:text-rose-400",
            "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20",
          ],
          [
            Mail,
            "Email Address",
            fac.email,
            "text-green-600 dark:text-green-500",
            "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20",
          ],
          [
            Globe,
            "Website",
            fac.website,
            "text-teal-600 dark:text-teal-400",
            "bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/20",
          ],
          [
            MapPin,
            "Location",
            fac.location,
            "text-teal-600 dark:text-teal-400",
            "bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/20",
            "col-span-full",
          ],
        ].map(([Ico, l, v, tc, bc, cls]) => (
          <div
            key={l}
            className={`flex items-center gap-4 p-4 rounded-2xl border ${bc} ${cls || ""}`}
          >
            <div
              className={`w-10 h-10 bg-white/50 dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-inherit`}
            >
              <Ico size={18} className={tc} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 opacity-80 mb-0.5">
                {l}
              </p>
              <p className={`text-sm font-bold ${tc}`}>{v}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
