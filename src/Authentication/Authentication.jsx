import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./login";
import AuthSide from "./AuthSide";


const Authentication = ({onClose}) => {
  const [view, setView] = useState("Login");

  return (
    <div className=" flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl shadow-green-100 overflow-hidden flex flex-col md:flex-row min-h-700px">
        {view === "Login" ? (
          <Login  onNavigate={setView} />
        ) : (
          <Signup onNavigate={setView} />
        )}
        <AuthSide onClose={onClose} />
      </div>
    </div>
  );
};

export default Authentication;
