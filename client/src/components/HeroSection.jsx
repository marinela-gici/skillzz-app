import react from "react";
import heroImg from "../assets/hero-img.png";

const HeroSection = () => {
  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-6">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          voluptate similique perspiciatis aperiam libero doloribus provident,
          aut ex rem cumque alias, quasi dolore asperiores. Animi ab tempore
          doloremque voluptatibus at.
        </div>
        <div>
          <img src={heroImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
