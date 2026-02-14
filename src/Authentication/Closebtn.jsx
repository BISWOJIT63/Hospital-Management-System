import React from "react";

const Closebtn = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="absolute top-2 p-2  px-4 right-0 z-50 text-2xl text-gray-500 hover:text-green-500 font-bold"
    >
      &times;
    </button>
  );
};

export default Closebtn;
