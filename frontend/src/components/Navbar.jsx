import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { Search, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar({ inHero, setIsSearchOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header
        className={`fixed rounded-md z-[100] w-full border-b transition-all duration-300 ${inHero
          ? "bg-transparent border-transparent"
          : "border-primary/10 bg-white/10 dark:bg-slate-950/10 backdrop-blur-sm"
          } px-4 md:px-6 lg:px-20 md:py-2 mb-10`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between py-2 md:py-0">
          <div className="flex items-center gap-2 md:gap-3">
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
          </div>

          {}
          <nav className="items-center gap-4 md:gap-10 transition-all z-[100] hidden lg:flex">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
              className={`flex items-center gap-1 text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
            >
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/center"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
              className={`flex items-center gap-1 text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
            >
              <span>CENTER</span>
            </NavLink>
            <NavLink
              to="/Doctors"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
              className={`flex items-center gap-1 text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
            >
              <span>Doctors</span>
            </NavLink>
            <NavLink
              to="/services"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
              className={`flex items-center gap-1 text-sm md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2 md:py-0 ${inHero ? "md:text-white text-slate-800 dark:text-slate-200" : "text-medical-dark dark:text-white"}`}
            >
              <span>Services</span>
            </NavLink>
          </nav>

          {/* Right Side Settings & Profile Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {location.pathname === "/" && (
              <button
                className={`p-2 rounded-full lg:hidden block hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${inHero ? "text-white" : "text-medical-dark dark:text-white"}`}
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={18} className="md:w-[20px] md:h-[20px] w-[18px] h-[18px]" />
              </button>
            )}

            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* Mobile Hamburger Menu (Right Side) */}
            <button 
              className={`p-2 lg:hidden block ${inHero ? "text-white" : "text-medical-dark dark:text-white"}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {isAuthenticated && user ? (
              <div 
                className="hidden lg:flex items-center gap-2 relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary/50 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border border-transparent dark:border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  title="Profile Menu"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary transition-colors shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm md:text-lg border-2 border-transparent group-hover:border-primary/50 transition-colors shadow-sm shrink-0">
                      {(user.name || user.fullName || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu Wrapper (adds transparent hit area to prevent losing hover) */}
                <div
                  className={`absolute right-0 top-full pt-2 w-56 z-[105] transform origin-top-right transition-all duration-200 ${
                    isProfileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
                    {/* User Profile Header inside Dropdown */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/20">
                      <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                        {user.name || user.fullName || "User"}
                      </p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-0.5">
                        {user.role || 'Patient'}
                      </p>
                    </div>

                    <Link
                      onClick={() => setIsProfileOpen(false)}
                      to={
                        user?.role?.toLowerCase?.() === 'admin'
                          ? `/admin/dashboard/${user.id || user._id}`
                          : user?.role?.toLowerCase?.() === 'doctor'
                          ? `/doctor/dashboard/${user.id || user._id}`
                          : `/patient/${user.id || user._id}`
                      }
                      className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800/50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-left transition-colors flex items-center justify-between"
                    >
                      Logout
                      <FiLogOut size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-1.5 md:gap-3">
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
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} user={user} logout={handleLogout} />
    </>
  );
}

