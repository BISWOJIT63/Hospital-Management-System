import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../../utils/validation';
import { api } from '../../utils/api';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ForgotPasswordForm = () => {
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data) => {
        try {
            setError('');
            await api.forgotPassword(data.email);
            setIsSent(true);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <Link
                to="/login"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors"
            >
                <FiArrowLeft /> Back to Login
            </Link>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your email to receive a password reset link.
                </p>
            </div>

            {isSent ? (
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-green-700 dark:text-green-300 text-center">
                    <p>Check your email! We've sent you a password reset link.</p>
                    <Link
                        to="/login"
                        className="mt-4 text-sm font-semibold underline hover:text-green-800"
                    >
                        Back to Sign In
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                {...register('email')}
                                type="email"
                                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            )}
        </motion.div>
    );
};

export default ForgotPasswordForm;
