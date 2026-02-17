import React from "react";
import sideImg from "../assets/images/sideImg.png";
import Closebtn from "./Closebtn";

const AuthSide = ({ onClose, isDark}) => {
  return (
    <div className="flex relative dark:bg-slate-950 justify-center items-center">
      <Closebtn className=" " onClose={onClose} />
      <img src={sideImg} alt="" />
    </div>
  );
};

export default AuthSide;
