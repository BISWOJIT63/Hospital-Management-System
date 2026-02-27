import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import FloatingSearch from "./FloatingSearch";
import EmergencyFab from "./EmergencyFab";
import Footer from "./Footer";
import Routing from "./routes/Routing";

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
        handleScroll(); // Check on mount/route change

        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/forgot-password";

    return (
        <div className="relative flex min-h-screen flex-col transition-colors duration-300">
            {!isAuthPage && (
                <Navbar inHero={inHero} setIsSearchOpen={setIsSearchOpen} />
            )}
            <main>
                <Routing />
            </main>

            {!isAuthPage && (
                <>
                    <EmergencyFab />
                    {location.pathname !== "/appointmnet" && (
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
