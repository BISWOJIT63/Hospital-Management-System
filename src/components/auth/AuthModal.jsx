import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const AuthModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState("login"); 

  useEffect(() => {
    if (isOpen) setView("login");
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden text-left"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 absolute top-0 left-0 right-0 z-10">
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FiX size={20} />
              </motion.button>
            </div>

            <div className="p-8 pt-16">
              <AnimatePresence mode="wait">
                {view === "login" && (
                  <LoginForm
                    key="login"
                    switchToRegister={() => setView("register")}
                    switchToForgot={() => setView("forgot")}
                  />
                )}
                {view === "register" && (
                  <RegisterForm
                    key="register"
                    switchToLogin={() => setView("login")}
                  />
                )}
                {view === "forgot" && (
                  <ForgotPasswordForm
                    key="forgot"
                    switchToLogin={() => setView("login")}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="h-1.5 w-full bg-gradient-to-r from-primary-light via-primary to-primary-dark"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
