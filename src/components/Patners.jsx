import React from "react";

const Partners = () => {
  const partners = [
    {
      name: "Medicure",
      icon: (
        <svg
          className="w-6 h-6 text-green-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
        </svg>
      ),
      hasBg: true,
    },
    {
      name: "NovaCare",
      icon: (
        <svg
          className="w-6 h-6 text-green-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z" />
        </svg>
      ),
      hasBg: true,
    },
    {
      name: "Apex Health",
      icon: (
        <svg
          className="w-8 h-8 text-green-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      ),
      hasBg: false,
    },
    {
      name: "PrimeLife",
      icon: (
        <svg
          className="w-7 h-7 text-green-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM14.5 12h-2v-1.5h-1v1.5H10v1h1.5v1.5h1V13h2v-1z" />
          <path d="M9 9h6v1H9z" opacity=".3" />
        </svg>
      ),
      hasBg: false,
    },
    {
      name: "ClearSound",
      icon: (
        <svg
          className="w-7 h-7 text-green-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 11h-3.17l1.59-2.74c.38-.66.16-1.5-.5-1.88-.66-.38-1.5-.16-1.88.5L15.26 10H8.74l-1.79-3.11c-.38-.66-1.22-.88-1.88-.5-.66.38-.88 1.22-.5 1.88L6.17 11H3c-.55 0-1 .45-1 1s.45 1 1 1h3.17l-1.59 2.74c-.38.66-.16 1.5.5 1.88.66.38 1.5.16 1.88-.5L8.74 14h6.52l1.79 3.11c.38.66 1.22.88 1.88.5.66-.38.88-1.22.5-1.88L17.83 13H21c.55 0 1-.45 1-1s-.45-1-1-1z" />
        </svg>
      ),
      hasBg: false,
    },
    {
      name: "Airway",
      icon: (
        <svg
          className="w-7 h-7 text-green-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" />
        </svg>
      ),
      hasBg: false,
    },
  ];

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 py-12 overflow-hidden border-t-4 border-green-600 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-slate-800 dark:text-white text-xl md:text-2xl font-bold tracking-wide">
          Trusted Partners
        </h2>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-98 md:w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-98 md:w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-scroll hover:cursor-pointer">
          {[0, 1].map((iteration) => (
            <div key={iteration} className="flex items-center gap-16 mx-8">
              {partners.map((partner, index) => (
                <div
                  key={`${iteration}-${index}`}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className={`
                      w-10 h-10 flex items-center justify-center rounded-lg
                      ${partner.hasBg ? "bg-green-600/20" : ""}
                    `}
                  >
                    {partner.icon}
                  </div>

                  <span className="text-slate-700 dark:text-white text-xl font-bold group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Partners;
