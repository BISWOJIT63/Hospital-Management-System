import React, { useState } from "react";

const FaqCard = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b p-2 border-gray-200 dark:border-slate-800 overflow-hidden">

      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between gap-8 items-start text-lg font-semibold px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition rounded-md text-gray-900 dark:text-white"
      >
        <h1 className="">{question}</h1>
        <span className="text-2xl text-primary">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <p className="px-4 py-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
};

export default FaqCard;
