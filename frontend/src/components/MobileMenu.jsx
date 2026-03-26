import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronRight,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Lock,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const getDashboardPath = (user) => {
  const id = user?.id || user?._id || "";
  const role = user?.role?.toLowerCase?.() || "";
  if (role === "admin") return `/admin/dashboard/${id}`;
  if (role === "doctor") return `/doctor/dashboard/${id}`;
  return `/patient/${id}`;
};

const MobileMenu = ({ isOpen, setIsOpen, user, logout }) => {
  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Hospital", path: "/center" },
    { name: "Clinic", path: "/center" },
    { name: "Services", path: "/Services" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-[100] lg:hidden backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-slate-900 shadow-2xl z-[101] flex flex-col overflow-y-auto lg:hidden text-slate-800 dark:text-gray-200 scrollbar-hide"
          >
            <div className="flex items-center justify-between p-4 mb-2">
              {user ? (
                <Link
                  to={getDashboardPath(user)}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {(user.name || user.fullName || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-slate-900 dark:text-white font-bold text-sm leading-tight">
                      {user.name || user.fullName || "User"}
                    </span>
                    <span className="text-slate-500 dark:text-gray-400 text-xs capitalize">
                      {user.role || "Patient"}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="text-slate-900 dark:text-white font-bold text-lg tracking-tight uppercase">
                  Aether<span className="text-primary">Care</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800/50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-4">
              {menuLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 border-b border-slate-200 dark:border-gray-700/50 text-sm font-semibold transition-colors ${
                      isActive ? "text-green-500" : "hover:text-green-500"
                    }`
                  }
                >
                  {link.name}
                  <ChevronRight size={16} className="text-slate-400" />
                </NavLink>
              ))}
            </nav>

            <div className="px-4 py-8">
              <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4">
                Contact Information
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-500 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-semibold mb-0.5">
                      General Inquiries
                    </p>
                    <a
                      href="mailto:info@example.com"
                      className="text-sm text-slate-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-500 transition-colors"
                    >
                      info@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-500 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-semibold mb-0.5">
                      Emergency Cases
                    </p>
                    <a
                      href="tel:+12456589856"
                      className="text-sm text-slate-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-500 transition-colors"
                    >
                      +1 24565 89856
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="px-4 pb-6">
              <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-slate-300 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:bg-green-500 dark:hover:bg-green-500 hover:text-white dark:hover:text-white hover:border-green-500 dark:hover:border-green-500 transition-all"
                >
                  <Facebook size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-slate-300 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:bg-green-500 dark:hover:bg-green-500 hover:text-white dark:hover:text-white hover:border-green-500 dark:hover:border-green-500 transition-all"
                >
                  <Twitter size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-slate-300 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:bg-green-500 dark:hover:bg-green-500 hover:text-white dark:hover:text-white hover:border-green-500 dark:hover:border-green-500 transition-all"
                >
                  <Instagram size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full border border-slate-300 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:bg-green-500 dark:hover:bg-green-500 hover:text-white dark:hover:text-white hover:border-green-500 dark:hover:border-green-500 transition-all"
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </div>

            {/* Auth / Logout Button */}
            <div className="px-4 mt-auto pb-8 pt-4">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 px-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/30 text-sm"
                >
                  <Lock size={16} />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2.5 px-4 bg-transparent border border-slate-300 dark:border-gray-500 hover:border-slate-800 dark:hover:border-white text-slate-800 dark:text-white font-bold rounded-full text-center transition-colors text-sm"
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2.5 px-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full text-center transition-colors shadow-lg shadow-green-500/30 text-sm"
                  >
                    SIGN UP
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
