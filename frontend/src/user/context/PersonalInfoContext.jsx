import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../components/context/AuthContext';

const PersonalInfoContext = createContext();

export function PersonalInfoProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    address: user?.address || '',
  });

  // Sync with auth user when it loads
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dob || '',
        gender: user.gender || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const updatePersonalInfo = (newInfo) => {
    setPersonalInfo(prev => ({
      ...prev,
      ...newInfo
    }));
  };

  return (
    <PersonalInfoContext.Provider value={{ personalInfo, updatePersonalInfo }}>
      {children}
    </PersonalInfoContext.Provider>
  );
}

export function usePersonalInfo() {
  const context = useContext(PersonalInfoContext);
  if (!context) {
    throw new Error('usePersonalInfo must be used within PersonalInfoProvider');
  }
  return context;
}
