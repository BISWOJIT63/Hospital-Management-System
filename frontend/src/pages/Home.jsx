import Hero from "../components/Hero";
import Hospitals from "../components/Hospitals";
import Specialists from "../components/Specialists";
import Reviews from "../components/Reviews";
import Faq from "../components/Faq";
import PartnersSlider from "../components/PatnerSlider";
import { useTheme } from "../components/hooks/useTheme";
import Services from "../components/Services";
import WhyWe from "../components/WhyWe";

const Home = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <>
            <Hero isDark={isDark} />
            <Hospitals useMock={true} />
            <Services useMock={true} />
            <Specialists useMock={true} />
            <WhyWe/>
            <Reviews />
            <Faq />
            <PartnersSlider />
        </>
    );
};

export default Home;
