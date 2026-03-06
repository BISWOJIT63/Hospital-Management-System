// src/App.jsx
import React from "react";
import "./app/globals.css"; // global styles

import RootLayout from "./app/Layout";
import Page from "./app/Page"; // lowercase import
import { PersonalInfoProvider } from "./context/PersonalInfoContext";
import { ThemeProvider } from "./components/Theme-Provider";

function App() {
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

export default App;
