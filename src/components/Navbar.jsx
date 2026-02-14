import { useState, useEffect } from "react";

export default function Navbar({ setIsModalOpen }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };
  const modalOpen = () => {
    console.log("Login btn clicked");
    setIsModalOpen(true);
  };

  return (
    <header className="fixed top-0 z-[100] w-full border-b border-primary/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-6 lg:px-20 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="logo-icon">
            <div className="logo-cross">
              <div className="heartbeat-line w-4 h-5"></div>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-medical-dark dark:text-white uppercase">
            Aether<span className="text-primary">Care</span>
          </h1>
        </div>

        <input
          className="hidden peer"
          id="mobile-menu-toggle"
          type="checkbox"
        />
        <label
          className="flex md:hidden text-medical-dark dark:text-white cursor-pointer"
          htmlFor="mobile-menu-toggle"
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </label>

        <nav className="hidden md:flex items-center gap-10 peer-checked:flex peer-checked:flex-col peer-checked:absolute peer-checked:top-full peer-checked:left-0 peer-checked:w-full peer-checked:bg-white/95 peer-checked:dark:bg-slate-950/95 peer-checked:p-8 peer-checked:border-b peer-checked:border-primary/10 md:peer-checked:flex-row md:peer-checked:static md:peer-checked:w-auto md:peer-checked:p-0 md:peer-checked:border-none md:peer-checked:bg-transparent">
          <a
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
            href="#hero"
          >
            Home
          </a>
          <a
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
            href="#hospitals"
          >
            Hospitals
          </a>
          <a
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
            href="#doctors"
          >
            Specialists
          </a>
          <a
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
            href="#how-it-works"
          >
            About
          </a>

          <div className="md:hidden flex items-center gap-4 mt-4 md:mt-0">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {isDark ? (
                <span className="material-symbols-outlined text-xl">
                  light_mode
                </span>
              ) : (
                <span className="material-symbols-outlined text-xl">
                  dark_mode
                </span>
              )}
            </button>
            <button className="px-5 py-3 rounded-xl bg-primary text-xs font-bold tracking-widest text-white">
              LOGIN
            </button>
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title="Toggle Light/Dark Mode"
          >
            {isDark ? (
              <span className="material-symbols-outlined text-xl">
                light_mode
              </span>
            ) : (
              <span className="material-symbols-outlined text-xl">
                dark_mode
              </span>
            )}
          </button>
          <button
            onClick={() => modalOpen()}
            className="px-6 py-2.5 rounded-full border border-primary/30 text-xs font-black tracking-widest text-primary hover:bg-primary hover:text-white transition-all"
          >
            LOGIN
          </button>
        </div>
      </div>
    </header>
  );
}
