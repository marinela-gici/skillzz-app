import React from "react";
import HeroSection from "../components/HeroSection";
import LatestJobs from "../components/LatestJobs";
import ApplicationModal from "../components/ApplicationModal.jsx";

const Main = () => {
  return (
    <>
      <HeroSection />
      <LatestJobs />
        <ApplicationModal />
    </>
  );
};

export default Main;
