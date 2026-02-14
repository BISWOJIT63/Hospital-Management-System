import React from "react";
import sideImg from "../assets/images/sideImg.png";
import Closebtn from "./Closebtn";

const AuthSide = ({ onClose }) => {
  return (
    <div className="flex relative justify-center items-center">
      <Closebtn className=" " onClose={onClose} />
      <img src={sideImg} alt="" />
    </div>
  );
};

export default AuthSide;
