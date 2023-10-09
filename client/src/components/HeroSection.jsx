import react from "react";
import heroImg from "../assets/hero-img.png";

const HeroSection = () => {
  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-6">
        <div>test</div>
        <div>
            <img src={heroImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
