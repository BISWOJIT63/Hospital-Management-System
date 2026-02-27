import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validation";
import { useAuth } from "../hooks/useAuth";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import RoleSelector from "./RoleSelector";
import SocialAuthButtons from "./SocialAuthButtons";

const LoginForm = ({ switchToForgot }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("patient");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: "patient",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setError("");
    const result = await login(data.email, data.password, selectedRole);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please sign in to your account
        </p>
      </div>

      <RoleSelector selectedRole={selectedRole} onSelect={setSelectedRole} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            <input
              {...register("email")}
              type="email"
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 dark:bg-gray-800 border ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register("rememberMe")}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-dark-card text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <SocialAuthButtons />
      </div>

      <Link to="/signup" className="mt-6 text-center gap-2 text-sm flex justify-center items-center text-gray-600 dark:text-gray-400">
          <span>New User?</span>
          <span className="hover:underline text-primary">Create new Account</span>
      </Link>
    </motion.div>
  );
};

export default LoginForm;
