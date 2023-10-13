import React from "react";
import { useNavigate } from 'react-router-dom'
import heroImg from "../assets/hero-img.png";
import Button from "./Button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-8">
      <div className="flex items-center grid grid-cols-1 md:grid-cols-2 dark:text-white min-h-[calc(100vh-64px)]">
        <div className="text-center md:text-left">
          <p className="text-4xl md:text-8xl">
            Find your <br /> dream{" "}
            <span className="dark:text-emerald-400 text-rose-400">Job</span>
          </p>
          <p className="py-12">Find Job, Employment and Career Opportunities</p>
          <Button value="View Latest Jobs" onClick={() => navigate('/')} />
        </div>
        <div>
          <img src={heroImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
