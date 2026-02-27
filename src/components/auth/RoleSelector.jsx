import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaUserShield, FaUserInjured } from 'react-icons/fa';

const roles = [
    { id: 'admin', label: 'Admin', icon: FaUserShield },
    { id: 'doctor', label: 'Doctor', icon: FaUserMd },
    { id: 'patient', label: 'Patient', icon: FaUserInjured },
];

const RoleSelector = ({ selectedRole, onSelect }) => {
    return (
        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl mb-6">
            {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                    <button
                        key={role.id}
                        onClick={() => onSelect(role.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all relative ${isSelected ? 'text-primary dark:text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                    >
                        {isSelected && (
                            <motion.div
                                layoutId="activeRole"
                                className="absolute inset-0 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-600"
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                style={{ zIndex: 0 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <Icon className={isSelected ? 'text-primary' : ''} />
                            {role.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default RoleSelector;
