import React, {useRef} from "react";
import HeroSection from "../components/HeroSection";
import ShowLatestJobs from "../components/ShowLatestJobs.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

const Main = () => {
    const ref = useRef(null);
    const handleClickScroll = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <HeroSection handleClickScroll={handleClickScroll} />
            <ShowLatestJobs scrollRef={ref} />
            <Contact />
            <Footer />
        </>
    );
};

export default Main;
