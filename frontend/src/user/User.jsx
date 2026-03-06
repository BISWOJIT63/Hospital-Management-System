
import React from "react";
import "./app/globals.css"; 

import RootLayout from "./app/Layout";
import Page from "./app/Page"; 
import { ThemeProvider } from "./components/Theme-Provider";
import { PersonalInfoProvider } from "./context/PersonalInfoContext";

function User() {
  return (
    <ThemeProvider>
      <PersonalInfoProvider>
        <div className="app df min-h-screen transition-colors">
          <RootLayout>
            <Page />
          </RootLayout>
        </div>
      </PersonalInfoProvider>
    </ThemeProvider>
  );
}

export default User;
