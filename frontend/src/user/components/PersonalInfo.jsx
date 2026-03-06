import { User, Pencil, X, Check } from "lucide-react";
import { useState } from "react";
import { usePersonalInfo } from "../context/PersonalInfoContext";

export default function PersonalInfo({ theme }) {
  const { personalInfo, updatePersonalInfo } = usePersonalInfo();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(personalInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updatePersonalInfo(formData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setFormData(personalInfo);
    setIsEditMode(false);
  };

  const fields = [
    { label: "Email Address", name: "email", value: personalInfo.email },
    { label: "Phone Number", name: "phone", value: personalInfo.phone },
    { label: "Date of Birth", name: "dob", value: personalInfo.dob },
    { label: "Gender", name: "gender", value: personalInfo.gender },
  ];

  return (
    <>
      <div
        className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"} border rounded-2xl p-6 shadow-lg transition-colors`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`text-xl font-bold flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            <User className="size-5 text-emerald-600 dark:text-emerald-400" />
            Personal Information
          </h3>
          <button
            onClick={() => setIsEditMode(true)}
            className="text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Pencil className="size-3.5" /> Edit
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.label} className="space-y-1">
              <label
                className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-400"}`}
              >
                {field.label}
              </label>
              <p
                className={`font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-900"}`}
              >
                {field.value}
              </p>
            </div>
          ))}
          <div className="md:col-span-2 space-y-1">
            <label
              className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-400"}`}
            >
              Physical Address
            </label>
            <p
              className={`font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-900"}`}
            >
              {personalInfo.address}
            </p>
          </div>
        </div>
      </div>

      {}
      {isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`${theme === "dark" ? "bg-slate-800" : "bg-white"} rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                Edit Personal Information
              </h2>
              <button
                onClick={handleCancel}
                className={`p-2 rounded-lg hover:${theme === "dark" ? "bg-slate-700" : "bg-slate-100"} transition-colors`}
              >
                <X
                  className={`size-5 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  className={`block text-sm font-bold mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-colors ${
                    theme === "dark"
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-bold mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-colors ${
                    theme === "dark"
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-bold mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                >
                  Date of Birth
                </label>
                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-colors ${
                    theme === "dark"
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-bold mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                >
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-colors ${
                    theme === "dark"
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-bold mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                >
                  Physical Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-colors resize-none ${
                    theme === "dark"
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8 justify-end">
              <button
                onClick={handleCancel}
                className={`px-6 py-2 rounded-lg border font-semibold transition-colors ${
                  theme === "dark"
                    ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/25"
              >
                <Check className="size-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
