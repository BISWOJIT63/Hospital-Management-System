import React from "react";
import { useTheme } from "./hooks/useTheme";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? <FiMoon size={20} /> : <FiSun size={20} />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
