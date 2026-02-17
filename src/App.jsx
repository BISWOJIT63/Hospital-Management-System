import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Hospitals from "./components/Hospitals";
import Specialists from "./components/Specialists";
import FloatingSearch from "./components/FloatingSearch";
import EmergencyFab from "./components/EmergencyFab";
import Footer from "./components/Footer";
import Modal from "./Authentication/Modal";
import Faq from "./components/Faq";

import { useState } from "react";
import Authentication from "./Authentication/Authentication";
import Reviews from "./components/Reviews";
import PartnersSlider from "./components/PatnerSlider";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useState(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const onClose = () => setIsModalOpen(false);

  useState(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY < heroHeight - 100) { 
        setInHero(true);
      } else {
        setInHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar
        setIsModalOpen={setIsModalOpen}
        isDark={isDark}
        toggleTheme={toggleTheme}
        inHero={inHero}
        setIsSearchOpen={setIsSearchOpen}
      />
      <main className="flex-grow">
        <Hero isDark={isDark} />
        <Features />
        <Hospitals />
        <Specialists />
        <Reviews />
        <Faq/>
        <PartnersSlider/>
      </main>
      <EmergencyFab />
      <FloatingSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      <Footer />
      <Modal isDark={isDark} onClose={onClose} isOpen={isModalOpen}>
        <Authentication isDark={isDark} onClose={onClose} />
      </Modal>
    </div>
  );
}

export default App;
