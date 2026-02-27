import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

const Authentication = ({ mode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-y-auto">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-dark/10 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute top-4 right-4 z-10"></div>

      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <p className="md:text-sm lg:text-xs">Back to Home</p>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative z-10 w-full ${mode === "signup" ? "max-w-2xl" : "max-w-lg"} bg-white dark:bg-slate-950 rounded-2xl shadow-2xl overflow-hidden my-8`}
      >
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary">
              {mode === "login"
                ? "Sign In to AetherCare"
                : mode === "signup"
                  ? "Join AetherCare"
                  : "Reset Password"}
            </h1>
          </div>

          {mode === "login" && <LoginForm />}
          {mode === "signup" && <RegisterForm />}
          {mode === "forgot" && <ForgotPasswordForm />}
        </div>

        <div className="h-1.5 w-full bg-gradient-to-r from-primary-light via-primary to-primary-dark"></div>
      </motion.div>
    </div>
  );
};

export default Authentication;
