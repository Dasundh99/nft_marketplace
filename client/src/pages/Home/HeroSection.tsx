import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="px-6 py-16 text-center bg-gradient-to-b from-purple-700 to-purple-900">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Discover, Collect, and Sell Extraordinary NFTs
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-6">
        The leading NFT marketplace on the blockchain. Start your digital collection now.
      </p>
      <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl">
        Explore Marketplace
      </button>
    </section>
  );
};

export default HeroSection;
