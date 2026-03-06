import React, { createContext, useContext, useState } from 'react';

const PersonalInfoContext = createContext();

export function PersonalInfoProvider({ children }) {
  const [personalInfo, setPersonalInfo] = useState({
    email: 'alex.wright@email.com',
    phone: '+1 (555) 0123-4567',
    dob: 'December 05, 1985',
    gender: 'Male',
    address: '422 Oakwood Avenue, Suite 105, Los Angeles, CA 90210',
  });

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
