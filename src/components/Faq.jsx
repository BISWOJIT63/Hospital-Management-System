import React from "react";
import FaqCard from "./FaqCard";

const Faq = () => {
  const faqs = [
    {
      id: 1,
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment online through our website or by calling the hospital reception.",
    },
    {
      id: 2,
      question: "Is emergency service available 24/7?",
      answer:
        "Yes, our emergency department operates 24 hours a day, 7 days a week.",
    },
    {
      id: 3,
      question: "Can I choose a specific doctor?",
      answer:
        "Yes, you can select your preferred doctor while booking an appointment.",
    },
    {
      id: 4,
      question: "Do you accept health insurance?",
      answer:
        "Yes, we accept most major health insurance providers. Please contact the billing desk for details.",
    },
    {
      id: 5,
      question: "How can I view my test reports online?",
      answer:
        "Log in to your patient account and visit the Reports section to download or view your lab results.",
    },
  ];

  return (
    <section className="mb-20">
      <div className="mx-auto max-w-7xl relative z-10 px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl mt-20">
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-6 md:mb-8 tracking-tighter uppercase">
              FAQ'S
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              Your Questions Our Answered.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4 max-w-2xl mx-auto ">
        {faqs.map((faq) => (
          <FaqCard key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default Faq;
