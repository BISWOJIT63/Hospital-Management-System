import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { Search, Home, Building2, Users, Activity } from "lucide-react";

export default function Navbar({ inHero, setIsSearchOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed rounded-md z-[100] w-full border-b transition-all duration-300 ${inHero
        ? "bg-transparent border-transparent"
        : "border-primary/10 bg-white/10 dark:bg-slate-950/10 backdrop-blur-sm"
        } px-4 md:px-6 lg:px-20 md:py-2 mb-10`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between py-2 md:py-0">
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <div className="logo-icon max-sm:w-10 max-sm:h-10">
            <div className="logo-cross max-sm:w-5 max-sm:h-5">
              <div className="heartbeat-line w-4 h-5"></div>
            </div>
          </div>
          <div className="max-sm:hidden">
            <h1
              className={`text-lg md:text-xl font-black tracking-tight uppercase ${inHero ? "text-white" : "text-medical-dark dark:text-white"}`}
            >
              Aether<span className="text-primary">Care</span>
            </h1>
          </div>
        </Link>

        {/* Desktop & Mobile Navigation Links (in Navbar) */}
        <nav className="flex items-center gap-4 md:gap-10 transition-all z-[100]">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "green" : "",
            })}
            className={`flex items-center gap-1 text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
          >
            <Home className="lg:hidden" size={20} />
            <span className="hidden lg:inline">Home</span>
          </NavLink>
          <NavLink
            to="/hospitals"
            style={({ isActive }) => ({
              color: isActive ? "green" : "",
            })}
            className={`flex items-center gap-1 text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
          >
            <Building2 className="lg:hidden" size={20} />
            <span className="hidden lg:inline">Care</span>
          </NavLink>
          <NavLink
            to="/Doctors"
            style={({ isActive }) => ({
              color: isActive ? "green" : "",
            })}
            className={`flex items-center gap-1 text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
          >
            <Users className="lg:hidden" size={20} />
            <span className="hidden lg:inline">Doctors</span>
          </NavLink>
          <NavLink
            to="/services"
            style={({ isActive }) => ({
              color: isActive ? "green" : "",
            })}
            className={`flex items-center gap-1 text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
          >
            <Activity className="lg:hidden" size={20} />
            <span className="hidden lg:inline">Services</span>
          </NavLink>
        </nav>

        {/* Right Side Settings & Profile Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {location.pathname === "/" && (
            <button
              className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${inHero ? "text-white" : "text-medical-dark dark:text-white"}`}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={18} className="md:w-[20px] md:h-[20px] w-[18px] h-[18px]" />
            </button>
          )}

          <ThemeToggle />

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                to={user.role === 'admin' ? '/admin' : user.role === 'doctor' ? '/doctor' : '/patient'}
                className="flex items-center gap-3 group"
                title="View Profile"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary transition-colors"
                  />
                ) : (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm md:text-lg border-2 border-transparent group-hover:border-primary/50 transition-colors shadow-sm">
                    {(user.name || user.fullName || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 md:p-2 rounded-full text-lime-500 hover:bg-lime-50 dark:hover:bg-lime-900/20 transition-all hidden md:flex"
                title="Logout"
              >
                <FiLogOut className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 md:gap-3">
              <Link
                to="/login"
                className="px-3 md:px-6 py-1.5 md:py-2.5 rounded-full border border-primary/30 text-[10px] md:text-xs font-black tracking-widest text-white dark:bg-white dark:text-slate-800 transition-all bg-slate-800"
              >
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="hidden md:flex px-6 py-2.5 rounded-full bg-primary text-xs font-black tracking-widest text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                SIGN UP
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

