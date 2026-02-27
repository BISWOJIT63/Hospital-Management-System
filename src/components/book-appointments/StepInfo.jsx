import StepHeader from "./StepHeader";

const InfoInput = ({ label, type = "text", value, field, placeholder, required = true, onChange }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {label} {required && <span className="text-emerald-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700  text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
    />
  </div>
);

function StepInfo({ data, onChange }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <StepHeader
        title="Basic Information"
        subtitle="We need your details for the prescription."
      />

      <div className="grid md:grid-cols-2 gap-6">
        <InfoInput label="First Name" field="firstName" value={data.firstName} onChange={onChange} placeholder="Jane" />
        <InfoInput label="Last Name" field="lastName" value={data.lastName} onChange={onChange} placeholder="Doe" />
        <InfoInput label="Email Address" type="email" field="email" value={data.email} onChange={onChange} placeholder="jane@example.com" />
        <InfoInput label="Phone Number" type="tel" field="phone" value={data.phone} onChange={onChange} placeholder="(555) 123-4567" />
        <InfoInput label="Date of Birth" type="date" field="dob" value={data.dob} onChange={onChange} placeholder="" />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Gender</label>
          <select
            value={data.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700  text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Reason for Visit (Optional)</label>
          <textarea
            rows="3"
            value={data.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Briefly describe your symptoms or reason for appointment..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
export default StepInfo;