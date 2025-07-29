import React from "react";
import HeroSection from "./HeroSection";
import Categories from "./Categories";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <HeroSection />
      <Categories />
    </div>
  );
};

export default Home;
