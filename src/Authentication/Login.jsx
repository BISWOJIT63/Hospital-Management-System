import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import InputField from "../utilities/InputField";
import RoleButton from "../utilities/RoleButton";
import Forgotpass from "./Forgotpass";

const Login = ({ onNavigate}) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [userRole, setUserRole] = useState("patient");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userRole: "patient",
    },
  });
  useEffect(() => {
    setValue("userRole", userRole);
  }, [userRole, setValue]);

  const onSigninSubmit = (data) => {
    console.log("Signing in:", data);
    alert("Signin logic triggered! Check console.");
  };
  useEffect(() => {
    setValue("isForgotPassword", isForgotPassword);
  }, [isForgotPassword, setIsForgotPassword]);

  return (
    <div className="w-full md:w-6/12 p-8 md:p-10 flex flex-col justify-center bg-white dark:bg-slate-950 relative">
      {isForgotPassword ? (
        <Forgotpass setIsForgotPassword={setIsForgotPassword} />
      ) : (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
              Portal Login
            </h2>
            <p className="text-slate-400 font-medium">
              Select your role and enter credentials.
            </p>
          </div>

          <div className="flex p-1.5 bg-gray-100 rounded-2xl mb-8 border border-gray-200/50">
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

          <form onSubmit={handleSubmit(onSigninSubmit)} className="space-y-5">
            <input type="hidden" {...register("userRole")} />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@hms.com"
              icon={Mail}
              validation={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              }}
            />

            <div className="space-y-1">
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                validation={{ required: "Password is required" }}
              />
              <div className="flex justify-end pr-1">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-green-500 rounded border-gray-300"
              />
              <label className="text-sm text-gray-500 font-medium tracking-tight">
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-400 hover:bg-green-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
            >
              Enter Portal
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-gray-400 font-bold text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => onNavigate("Signup")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Register Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
