import React, { useState } from "react";

const FaqCard = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-500 overflow-hidden">
      
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between gap-8 items-start text-lg font-semibold px-4 py-3 cursor-pointer bg-white/5 hover:bg-white/10 transition rounded-md"
      >
        <h1 className="">{question}</h1>
        <span className="text-2xl">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <p className="px-4 pb-4 text-gray-500">
          {answer}
        </p>
      )}
    </div>
  );
};

export default FaqCard;
