import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Authentication from "../../pages/Authentication";
import Profile from "../../pages/Profile";
import DoctorList from "../Doctors/DoctorList";
import DoctorProfile from "../Doctors/DoctorProfile";
import List from "../hospitals/List";
import Details from "../hospitals/details/Details";
import Appointments from "../book-appointments/Appointments";
import ServiceDeatils from "../Services/ServiceDeatils";
import ServiceList from './../Services/ServiceList';
import Admin from "../../Dashboard/Admin";

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
        <Route
          path="/reset-password/:token"
          element={<Authentication mode="reset" />}
        />
        <Route path="/appointmnet" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctors-profile" element={<DoctorProfile />} />
        <Route path="/Hospital-profile" element={<Details />} />
        <Route path="/service-profile" element={<ServiceDeatils />} />
        <Route path="/admin" element={<Admin />} />
        
        <Route path="/hospitals" element={<List />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/services" element={<ServiceList />} />

      </Routes>
    </main>
  );
};

export default Routing;
