import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { api } from '../utils/api';
import { X, Calendar, Clock, Activity, Loader2 } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, provider, providerType, preselectedService }) => {
    const { user, isAuthenticated } = useContext(AuthContext);

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState(preselectedService || '');
    const [notes, setNotes] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!isOpen) return null;

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 text-center animate-fade-in shadow-2xl">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Login Required</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">You must be logged in to book an appointment.</p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={onClose} className="px-4 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">Cancel</button>
                        <a href="/login" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium transition-colors">Go to Login</a>
                    </div>
                </div>
            </div>
        );
    }

    if (user.role !== 'Patient') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 text-center animate-fade-in shadow-2xl">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Access Denied</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">Only patient accounts are permitted to book appointments. You are logged in as a {user.role}.</p>
                    <button onClick={onClose} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium transition-colors">Close</button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!date || !time || !service) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            const appointmentData = {
                providerId: provider._id || provider.id,
                providerType: providerType,
                service,
                date,
                time,
                notes
            };

            const response = await api.createAppointment(appointmentData);

            if (response.success || response.status === 201) {
                setSuccess('Appointment booked successfully!');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setError(response.message || 'Failed to book appointment.');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in">
                <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                        Book Appointment
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <img
                        src={provider.avatar || provider.image || 'https://via.placeholder.com/150'}
                        alt={provider.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white">{provider.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{providerType} • {provider.specialty || provider.type || 'General'}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {error && <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">{error}</div>}
                    {success && <div className="p-3 bg-green-50 text-green-600 border border-green-200 rounded-lg text-sm">{success}</div>}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                            <Activity size={16} className="text-primary" /> Service Required
                        </label>
                        <input
                            type="text"
                            required
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            placeholder="e.g. General Consultation, Dental Checkup..."
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                                <Calendar size={16} className="text-primary" /> Preferred Date
                            </label>
                            <input
                                type="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                                <Clock size={16} className="text-primary" /> Preferred Time
                            </label>
                            <input
                                type="time"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Any specific symptoms or questions?"
                            rows="3"
                            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Confirm Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
