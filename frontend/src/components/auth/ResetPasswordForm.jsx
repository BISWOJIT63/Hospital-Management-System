import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "../../utils/api";
import { FiLock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const ResetPasswordForm = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data) => {
        try {
            setError("");
            await api.resetPassword(token, data.password);
            setSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            setError(err.message || "Failed to reset password. The link may have expired.");
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full text-center"
            >
                <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        ✓
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Password Reset
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Your password has been changed successfully. You will be redirected to login shortly.
                    </p>
                </div>
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
                >
                    Go to Login <FiArrowRight />
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Set New Password
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Please enter your new password below.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Password
                    </label>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            {...register("password")}
                            type="password"
                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border ${errors.password ? "border-lime-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white`}
                            placeholder="Enter new password"
                        />
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
                            type="password"
                            className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border ${errors.confirmPassword ? "border-lime-500" : "border-gray-300 dark:border-gray-600"} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white`}
                            placeholder="Confirm new password"
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-lime-500 text-xs mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-lime-50 dark:bg-lime-900/30 text-lime-600 dark:text-lime-300 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200"
                >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </motion.div>
    );
};

export default ResetPasswordForm;
