import { ChevronDown } from "lucide-react";

import { useForm } from "react-hook-form";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  validation = {},
  options = null,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userRole: "patient",
      terms: false,
    },
  });
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center ml-1">
        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
          {label}
        </label>
        {errors[name] && (
          <span className="text-[10px] text-red-500 font-bold italic">
            * {errors[name].message || "Required"}
          </span>
        )}
      </div>
      <div className="relative group">
        <div
          className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
            errors[name]
              ? "text-red-400"
              : "text-gray-400 group-focus-within:text-green-500"
          }`}
        >
          <Icon size={18} />
        </div>

        {options ? (
          <div className="relative">
            <select
              {...register(name, validation)}
              className={`block w-full pl-11 pr-10 py-2.5 bg-white border rounded-xl focus:ring-4 transition-all appearance-none text-gray-700 ${
                errors[name]
                  ? "border-red-200 focus:ring-red-100"
                  : "border-gray-100 focus:ring-green-500/10 focus:border-green-500"
              }`}
            >
              <option value="">Select {label}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            {...register(name, validation)}
            className={`block w-full pl-11 pr-4 py-2.5 bg-white border rounded-xl focus:ring-4 transition-all text-gray-700 placeholder:text-gray-300 ${
              errors[name]
                ? "border-red-200 focus:ring-red-100"
                : "border-gray-100 focus:ring-green-500/10 focus:border-green-500"
            }`}
          />
        )}
      </div>
    </div>
  );
};
export default InputField;
