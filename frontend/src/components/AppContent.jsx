import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import FloatingSearch from "./FloatingSearch";
import EmergencyFab from "./EmergencyFab";
import Footer from "./Footer";
import Routing from "./routes/Routing";
import Location from "./Doctors/subpages/Location";

function AppContent() {
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

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  const isDashboardPage =
    location.pathname === "/admin" ||
    location.pathname === "/doctor";

  const isSuperAdminPage = location.pathname === "/gmara";
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
