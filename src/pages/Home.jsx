import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Hospitals from "../components/Hospitals";
import Specialists from "../components/Specialists";
import Reviews from "../components/Reviews";
import Faq from "../components/Faq";
import PartnersSlider from "../components/PatnerSlider";
import { useTheme } from "../components/hooks/useTheme";

const Home = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <>
            <Hero isDark={isDark} />
            <Features />
            <Hospitals />
            <Specialists />
            <Reviews />
            <Faq />
            <PartnersSlider />
        </>
    );
};

export default Home;
