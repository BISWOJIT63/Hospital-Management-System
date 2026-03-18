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
import ServiceList from "./../Services/ServiceList";
import Admin from "../../Dashboard/Admin";
import User from "./../../user/User";
import Clinic from "../clinic/Clinic";
import DoctorPortal from "../../doctor/Doctor";
import SuperAdmin from "../../superAdmin/SuperAdmin";
import About from "../About";
import AddReview from "../../pages/AddReview";
import ReviewList from "../../pages/ReviewList";

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
        <Route path="/appointment" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctors-profile/:id" element={<DoctorProfile />} />
        <Route path="/hospital-profile/:id" element={<Details />} />
        <Route path="/clinic-profile/:id" element={<Clinic />} />

        <Route path="/service-profile/:id" element={<ServiceDeatils />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard/:id" element={<Admin />} />
        <Route path="/patient" element={<User />} />
        <Route path="/patient/:id" element={<User />} />
        <Route path="/doctor" element={<DoctorPortal />} />
        <Route path="/doctor/dashboard/:id" element={<DoctorPortal />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/about" element={<About />} />

        <Route path="/center" element={<List/>} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/reviews" element={<AddReview />} />
        <Route path="/reviews/:entity/:id" element={<ReviewList />} />
      </Routes>
    </main>
  );
};

export default Routing;
