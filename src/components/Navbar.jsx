import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ inHero, setIsSearchOpen }) {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 z-[100] w-full border-b transition-all duration-300 ${inHero
        ? "bg-transparent border-transparent"
        : "border-primary/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl"
        } px-4 md:px-6 lg:px-20 py-4 md:py-6`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="logo-icon max-sm:w-4 max-sm:h-6">
            <div className="logo-cross max-sm:w-3 max-sm:h-3">
              <div className="heartbeat-line max-sm:w-2 max-sm:h-3 w-4 h-5"></div>
            </div>
          </div>
          <h1 className={`text-xl md:text-2xl max-sm:text-sm font-black tracking-tight uppercase ${inHero ? "text-white" : "text-medical-dark dark:text-white"}`}>
            Aether<span className="text-primary">Care</span>
          </h1>
        </Link>

        <button
          className={`md:hidden mr-2 ${inHero ? "text-white" : "text-medical-dark dark:text-white"}`}
          onClick={() => setIsSearchOpen(true)}
        >
          <span className="material-symbols-outlined max-sm:text-xl text-2xl">search</span>
        </button>

        <input
          className="hidden peer"
          id="mobile-menu-toggle"
          type="checkbox"
        />
        <label
          className={`flex md:hidden cursor-pointer ${inHero ? "text-white" : "text-medical-dark dark:text-white"}`}
          htmlFor="mobile-menu-toggle"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </label>

        <nav className="hidden md:flex items-center gap-10 peer-checked:flex peer-checked:flex-col peer-checked:absolute peer-checked:top-full peer-checked:left-0 peer-checked:w-full peer-checked:bg-white/95 peer-checked:dark:bg-slate-950/95 peer-checked:p-8 peer-checked:border-b peer-checked:border-primary/10 peer-checked:shadow-xl md:peer-checked:flex-row md:peer-checked:static md:peer-checked:w-auto md:peer-checked:p-0 md:peer-checked:border-none md:peer-checked:bg-transparent md:peer-checked:shadow-none transition-all duration-300 ease-in-out origin-top">
          <a
            className={`text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
            href="#hero"
          >
            Home
          </a>
          <a
            className={`text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
            href="#hospitals"
          >
            Hospitals
          </a>
          <a
            className={`text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
            href="#doctors"
          >
            Specialists
          </a>
          <a
            className={`text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
            href="#how-it-works"
          >
            About
          </a>

          <div className="md:hidden flex flex-col items-start gap-4 mt-6">
            <div className="flex items-center gap-4 w-full justify-between">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Theme</span>
              <ThemeToggle />
            </div>

            {isAuthenticated && user ? (
              <button
                className="w-full py-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold tracking-widest shadow-lg shadow-red-500/10 mt-4 flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <FiLogOut /> LOGOUT ({user.name || user.fullName})
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full py-4 rounded-xl bg-primary text-sm font-bold tracking-widest text-white shadow-lg shadow-primary/30 mt-4 text-center"
                >
                  LOGIN
                </Link>
                <Link
                  to="/signup"
                  className="w-full py-4 rounded-xl bg-white border border-primary text-sm font-bold tracking-widest text-primary shadow-lg shadow-primary/10 mt-2 text-center"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${inHero ? "text-white" : "text-slate-700 dark:text-slate-200"}`}>
                Hi, {user.name || user.fullName}
              </span>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                title="Logout"
              >
                <FiLogOut className="text-xl" />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-full border border-primary/30 text-xs font-black tracking-widest text-white dark:bg-white dark:text-slate-800 transition-all bg-slate-800"
              >
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 rounded-full bg-primary text-xs font-black tracking-widest text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                SIGN UP
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
