import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminSchema,
  doctorSchema,
  patientSchema,
} from "../../utils/validation";
import { DEPARTMENTS, SPECIALTIES } from "../../utils/constants";
import { useAuth } from "../hooks/useAuth";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCalendar,
  FiMapPin,
  FiActivity,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import RoleSelector from "./RoleSelector";
import SocialAuthButtons from "./SocialAuthButtons";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [selectedRole, setSelectedRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fromDay, setFromDay] = useState("Monday");
  const [toDay, setToDay] = useState("Friday");
  const [fromTime, setFromTime] = useState("09:00");
  const [toTime, setToTime] = useState("17:00");
  const navigate = useNavigate();

  const { register: registerAuth } = useAuth();

  const getSchema = () => {
    switch (selectedRole) {
      case "admin":
        return adminSchema;
      case "doctor":
        return doctorSchema;
      case "patient":
        return patientSchema;
      default:
        return patientSchema;
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(getSchema()),
  });

  React.useEffect(() => {
    reset();
  }, [selectedRole, reset]);

  React.useEffect(() => {
    if (selectedRole === "doctor" && setValue) {
      setValue("availableDays", `${fromDay} to ${toDay}, ${fromTime} to ${toTime}`, { shouldValidate: true });
    }
  }, [fromDay, toDay, fromTime, toTime, selectedRole, setValue]);

  const onSubmit = async (data) => {
    setError("");
    const result = await registerAuth(data, selectedRole);
    if (!result.success) {
      setError(result.error);
    } else {
      // Use the actual role from the server for redirection
      const userRole = result.user?.role?.toLowerCase();
      const uid = result.user?.id || result.user?._id;

      if (userRole === "admin" || userRole === "superadmin") {
        navigate(uid ? `/admin/dashboard/${uid}` : "/admin");
      } else if (userRole === "doctor") {
        navigate(uid ? `/doctor/dashboard/${uid}` : "/doctor");
      } else {
        navigate(uid ? `/patient/${uid}` : "/patient");
      }
    }
  };

  const InputField = ({
    label,
    name,
    icon: Icon,
    type = "text",
    placeholder,
  }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-3.5 text-gray-400" />
        <input
          {...register(name)}
          type={type}
          className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border ${errors[name] ? "border-lime-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white`}
          placeholder={placeholder}
        />
      </div>
      {errors[name] && (
        <p className="text-lime-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Join as a {selectedRole}
        </p>
      </div>

      <RoleSelector selectedRole={selectedRole} onSelect={setSelectedRole} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="fullName"
            icon={FiUser}
            placeholder="John Doe"
          />
          <InputField
            label="Email Address"
            name="email"
            icon={FiMail}
            type="email"
            placeholder="john@example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Phone Number"
            name="phone"
            icon={FiPhone}
            placeholder="+1 234 567 8900"
          />
          {selectedRole === "patient" && (
            <InputField
              label="Date of Birth"
              name="dob"
              icon={FiCalendar}
              type="date"
              placeholder=""
            />
          )}
          {selectedRole === "doctor" && (
            <InputField
              label="License Number"
              name="licenseNumber"
              icon={FiActivity}
              placeholder="LIC-12345"
            />
          )}
          {selectedRole === "admin" && (
            <InputField
              label="Employee ID"
              name="employeeId"
              icon={FiUser}
              placeholder="EMP-001"
            />
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRole}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {selectedRole === "patient" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Gender
                    </label>
                    <select
                      {...register("gender")}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-lime-500 text-xs mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                  <InputField
                    label="Blood Group"
                    name="bloodGroup"
                    icon={FiActivity}
                    placeholder="O+"
                  />
                </div>
                <InputField
                  label="Address"
                  name="address"
                  icon={FiMapPin}
                  placeholder="123 Main St"
                />
                <InputField
                  label="Emergency Contact"
                  name="emergencyContact"
                  icon={FiPhone}
                  placeholder="Mom: +1 ..."
                />
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Medical History
                  </label>
                  <textarea
                    {...register("medicalHistory")}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                    rows="2"
                    placeholder="Any existing conditions..."
                  ></textarea>
                </div>
              </>
            )}

            {selectedRole === "doctor" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Specialization
                    </label>
                    <select
                      {...register("specialty")}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                    >
                      <option value="">Select Specialty</option>
                      {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.specialty && (
                      <p className="text-lime-500 text-xs mt-1">
                        {errors.specialty.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Experience (Years)
                    </label>
                    <select
                      {...register("experience")}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                    >
                      <option value="">Select Experience</option>
                      {[...Array(11)].map((_, i) => (
                        <option key={i} value={i.toString()}>{i}</option>
                      ))}
                      <option value="10+">10+</option>
                    </select>
                    {errors.experience && (
                      <p className="text-lime-500 text-xs mt-1">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Department
                    </label>
                    <select
                      {...register("department")}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                    >
                      <option value="">Select Department</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.department && (
                      <p className="text-lime-500 text-xs mt-1">
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                  <InputField
                    label="Consultation Fee"
                    name="consultationFee"
                    icon={FiActivity}
                    placeholder="$50"
                  />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Day</label>
                      <select
                        value={fromDay}
                        onChange={(e) => setFromDay(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                      >
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To Day</label>
                      <select
                        value={toDay}
                        onChange={(e) => setToDay(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                      >
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</label>
                      <input
                        type="time"
                        value={fromTime}
                        onChange={(e) => setFromTime(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Time</label>
                      <input
                        type="time"
                        value={toTime}
                        onChange={(e) => setToTime(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                      />
                    </div>
                  </div>
                  <input type="hidden" {...register("availableDays")} />
                </div>
              </>
            )}

            {selectedRole === "admin" && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </label>
                <select
                  {...register("department")}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white"
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.department && (
                  <p className="text-lime-500 text-xs mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800 border ${errors.password ? "border-lime-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-lime-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border ${errors.confirmPassword ? "border-lime-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-lime-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-lime-50 dark:bg-lime-900/30 text-lime-600 dark:text-lime-300 text-sm rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 flex items-center justify-center"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <Link
        to="/login"
        className="mt-6 text-center gap-2 text-sm flex justify-center items-center text-gray-600 dark:text-gray-400"
      >
        <span>Already have an account?</span>
        <span className="hover:underline text-primary">Login</span>
      </Link>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white rounded-md dark:bg-dark-card text-gray-500">
              Or join with
            </span>
          </div>
        </div>

        <SocialAuthButtons role={selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} />
      </div>
    </motion.div>
  );
};

export default RegisterForm;
