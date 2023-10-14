import React from "react";
import HeroSection from "../components/HeroSection";
import LatestJobs from "../components/LatestJobs";
import ShowLatestJobs from "../components/ShowLatestJobs.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

const Main = () => {
    return (
        <>
            <HeroSection />
            <ShowLatestJobs />
            <Contact />
            <Footer />
        </>
    );
};

export default Main;
