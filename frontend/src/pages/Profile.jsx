import React, { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiActivity, FiMapPin, FiCalendar, FiEdit } from "react-icons/fi";

const Profile = () => {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24 pb-12">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Please log in to view your profile</h2>
                    <Link to="/login" className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold">Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-12 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Header Base */}
                    <div className="h-32 bg-gradient-to-r from-primary to-primary-dark"></div>

                    {/* Profile Info section */}
                    <div className="px-8 pb-8 flex flex-col items-center md:items-start md:flex-row relative">
                        {/* Avatar */}
                        <div className="-mt-16 mb-4 md:mb-0 md:mr-6 relative group cursor-pointer">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 bg-primary flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                                    {(user.name || "U").charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <FiEdit className="text-white text-2xl" />
                            </div>
                        </div>

                        {/* Name and Role */}
                        <div className="text-center md:text-left pt-2 md:pt-4 flex-1">
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                {user.name}
                            </h1>
                            <span className="inline-block mt-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold capitalize tracking-wider">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    {/* Details section */}
                    <div className="px-8 pb-8 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-primary">
                                    <FiUser size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Full Name</p>
                                    <p className="font-semibold text-slate-800 dark:text-white">{user.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-primary">
                                    <FiMail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Email Address</p>
                                    <p className="font-semibold text-slate-800 dark:text-white">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-primary">
                                    <FiActivity size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Account Type</p>
                                    <p className="font-semibold text-slate-800 dark:text-white capitalize">{user.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
