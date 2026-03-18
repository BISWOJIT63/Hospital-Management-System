import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import FloatingSearch from "./FloatingSearch";
import EmergencyFab from "./EmergencyFab";
import Footer from "./Footer";
import Routing from "./routes/Routing";
import Location from "./Doctors/subpages/Location";

import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function AppContent() {
  const { loading } = useContext(AuthContext);
  const [inHero, setInHero] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (location.pathname === "/") {
        if (window.scrollY < heroHeight - 100) {
          setInHero(true);
        } else {
          setInHero(false);
        }
      } else {
        setInHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  const isDashboardPage =
    location.pathname === "/admin" ||
    location.pathname === "/doctor";

  const isSuperAdminPage = location.pathname === "/gmara" || location.pathname.startsWith("/superadmin");
  const hideNavAndFooter = isAuthPage || isSuperAdminPage;

  return (
    <div className="relative flex min-h-screen flex-col transition-colors duration-300">
      {!hideNavAndFooter && (
        <Navbar inHero={inHero} setIsSearchOpen={setIsSearchOpen} />
      )}
      <main>
        <Routing />
      </main>

      {!hideNavAndFooter && (
        <>
          <EmergencyFab />
          {location.pathname === "/" && (
            <FloatingSearch
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default AppContent;
