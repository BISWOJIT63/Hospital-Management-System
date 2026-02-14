import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Hospitals from "./components/Hospitals";
import Specialists from "./components/Specialists";
import FloatingSearch from "./components/FloatingSearch";
import EmergencyFab from "./components/EmergencyFab";
import Footer from "./components/Footer";
import Modal from "./Authentication/Modal";

import { useState } from "react";
import Authentication from "./Authentication/Authentication";
import Reviews from "./components/Reviews";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => setIsModalOpen(false);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar setIsModalOpen={setIsModalOpen} />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Hospitals />
        <Specialists />
        <Reviews/>
      </main>
      <EmergencyFab />
      <FloatingSearch />
      <Footer />
      <Modal onClose={onClose} isOpen={isModalOpen}>
        <Authentication onClose={onClose} />
      </Modal>
    </div>
  );
}

export default App;
