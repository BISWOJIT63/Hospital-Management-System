import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Authentication from "../../pages/Authentication";
import Appointment from "/HOSPITAL MANAGEMENT SYSTEM/Hospital Mangement System/src/components/book-appointments/Appointments"

const Routing = () => {
  return (
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication mode="login" />} />
        <Route path="/signup" element={<Authentication mode="signup" />} />
        <Route
          path="/forgot-password"
          element={<Authentication mode="forgot" />}
        />
        <Route path="/appointmnet" element={<Appointment />} />
      </Routes>
    </main>
  );
};

export default Routing;
