import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  Stethoscope,
  ShieldCheck,
  Briefcase,
  MapPin,
  ArrowRight,
} from "lucide-react";

import InputField from "/HOSPITAL MANAGEMENT SYSTEM/Hospital Mangement System/src/utilities/InputField";
import RoleButton from "/HOSPITAL MANAGEMENT SYSTEM/Hospital Mangement System/src/utilities//RoleButton";

const Signup = ({ onNavigate }) => {
  const [userRole, setUserRole] = useState("patient");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userRole: "patient",
      terms: false,
    },
  });

  const password = watch("password");

  useEffect(() => {
    setValue("userRole", userRole);
  }, [userRole, setValue]);

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="w-full h-98 md:w-6/12 p-6 md:p-6 flex flex-col justify-center bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-slate-400">
          Join our system as patient, doctor, or admin.
        </p>
      </div>

      <div className="flex p-1.5 bg-gray-50 rounded-2xl mb-2 border border-gray-100">
        <RoleButton
          role="patient"
          label="Patient"
          userRole={userRole}
          setUserRole={setUserRole}
          icon={User}
        />
        <RoleButton
          role="doctor"
          label="Doctor"
          userRole={userRole}
          setUserRole={setUserRole}
          icon={Stethoscope}
        />
        <RoleButton
          role="admin"
          label="Admin"
          userRole={userRole}
          setUserRole={setUserRole}
          icon={ShieldCheck}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input type="hidden" {...register("userRole")} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <InputField
            label="Full Name"
            name="fullName"
            placeholder="John Doe"
            icon={User}
            validation={{ required: "Name is required" }}
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@example.com"
            icon={Mail}
            validation={{
              required: "Email required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            }}
          />
          <InputField
            label="Phone Number"
            name="phone"
            placeholder="+91 98765 43210"
            icon={Phone}
            validation={{
              required: "Phone required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Invalid 10-digit number",
              },
            }}
          />

          {userRole === "patient" && (
            <InputField
              label="Date of Birth"
              name="dob"
              type="date"
              icon={Calendar}
              validation={{ required: "DOB required" }}
            />
          )}

          {userRole === "doctor" && (
            <>
              <InputField
                label="License No."
                name="licenseNumber"
                placeholder="MED-12345"
                icon={ShieldCheck}
                validation={{ required: "License required" }}
              />
              <InputField
                label="Specialization"
                name="specialization"
                placeholder="Select Specialty"
                icon={Briefcase}
                validation={{ required: "Specialty required" }}
                options={[
                  "Cardiology",
                  "Neurology",
                  "Pediatrics",
                  "Dermatology",
                  "General Medicine",
                ]}
              />
            </>
          )}

          {userRole === "admin" && (
            <>
              <InputField
                label="Employee ID"
                name="employeeId"
                placeholder="EMP-990"
                icon={Briefcase}
                validation={{ required: "ID required" }}
              />
              <InputField
                label="Department"
                name="department"
                placeholder="Select Dept"
                icon={MapPin}
                validation={{ required: "Dept required" }}
                options={["Administration", "HR", "Billing", "IT Support"]}
              />
            </>
          )}

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            validation={{
              required: "Password required",
              minLength: { value: 6, message: "Min 6 chars" },
            }}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            validation={{
              required: "Confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
          />

          {userRole === "patient" && (
            <div className="md:col-span-2">
              <InputField
                label="Gender"
                name="gender"
                icon={User}
                validation={{ required: "Required" }}
                options={["Male", "Female", "Other", "Prefer not to say"]}
              />
              {errors.validation && (
            <p className="text-red-500 text-[10px] font-bold ml-7 uppercase tracking-tight">
              {errors.validation.message}
            </p>
          )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("terms", { required: "You must accept terms" })}
              className="w-5 h-5 accent-green-400 rounded border-gray-300 cursor-pointer"
            />
            <label className="text-sm text-gray-500 font-medium">
              I agree to the{" "}
              <span className="text-green-500 font-bold hover:underline cursor-pointer">
                Terms & Conditions
              </span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-[10px] font-bold ml-7 uppercase tracking-tight">
              {errors.terms.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-400 hover:bg-green-500 text-white font-black py-3 rounded-2xl shadow-xl shadow-green-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
        >
          Sign Up
          <ArrowRight size={20} />
        </button>
      </form>

      <p className="text-center text-gray-400 font-bold text-sm mt-5">
        Already have an account?{" "}
        <span
          onClick={() => onNavigate("Login")}
          className="text-green-500 hover:underline cursor-pointer"
        >
          Log in
        </span>
      </p>
    </div>
  );
};

export default Signup;
