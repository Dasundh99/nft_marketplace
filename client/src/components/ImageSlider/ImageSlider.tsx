import React, { useState, useEffect } from "react";
import Image1 from "../../assets/Slider1.jpg";

const slides = [
  {
    src: Image1,
    name: "MintedGold",
    by: "by CryptoArt",
    texts: ["Floor Price", "SOL 12.00", "Floor Price", "SOL 13.00", "Floor Price", "SOL 15.00"],
  },
  {
    src: "https://images.unsplash.com/photo-1666979663035-b840b143396f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "CrystalForge",
    by: "by Artisans",
    texts: ["Floor Price", "SOL 12.00", "Floor Price", "SOL 6.00", "Floor Price", "SOL 12.00"],
  },
  {
    src: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "IronPhoenix",
    by: "by PhoenixLabs",
    texts: ["Floor Price", "SOL 11.00", "Floor Price", "SOL 10.00", "Floor Price", "SOL 7.00"],
  },
  {
    src: "https://images.unsplash.com/photo-1729830114379-4c3dfe391a74?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "ShadowCoin",
    by: "by ShadowLabs",
    texts: ["Floor Price", "SOL 10.00", "Floor Price", "SOL 7.00", "Floor Price", "SOL 8.00"],
  },
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const slide = setInterval(nextSlide, 3000);
    return () => clearInterval(slide);
  }, [currentIndex]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full">
      <div className="w-full flex">
        {/* Image */}
        <img
          src={currentSlide.src}
          className="w-full object-cover h-120 opacity-50"
          alt={`Slide ${currentIndex + 1}`}
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-baseline-last justify-start py-10 px-5">
          <div className="text-white w-full max-w-md">
            <div className="flex flex-col gap-1">
              {/* Asset Name */}
              <div className="text-2xl font-extrabold tracking-wide">
                {currentSlide.name}
              </div>
              {/* Creator Info */}
              <div className="text-sm tracking-wide">
                {currentSlide.by}
              </div>

              {/* Slide Info Container */}
              <div className="flex px-6 py-5 bg-black/60 rounded-xl border border-gray-600 shadow-md">
                {/* Column 1 */}
                <div className="flex-1 px-4">
                  <div className="text-sm text-gray-300">{currentSlide.texts[0]}</div>
                  <div className="text-base font-semibold mt-1">{currentSlide.texts[1]}</div>
                </div>

                {/* Divider */}
                <div className="w-px bg-gray-500 mx-3"></div>

                {/* Column 2 */}
                <div className="flex-1 px-4">
                  <div className="text-sm text-gray-300">{currentSlide.texts[2]}</div>
                  <div className="text-base font-semibold mt-1">{currentSlide.texts[3]}</div>
                </div>

                {/* Divider */}
                <div className="w-px bg-gray-500 mx-3"></div>

                {/* Column 3 */}
                <div className="flex-1 px-4">
                  <div className="text-sm text-gray-300">{currentSlide.texts[4]}</div>
                  <div className="text-base font-semibold mt-1">{currentSlide.texts[5]}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Thumbnail previews in bottom-right */}
      <div className="py-6 absolute bottom-4 right-4 flex gap-2 z-10">
        {slides
          .map((slide, index) => ({ slide, index }))
          .filter(({ index }) => index !== currentIndex)
          .slice(0, 3) // Show only 3 unselected images
          .map(({ slide, index }) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-16 h-16 rounded overflow-hidden border-2 border-white/50 hover:border-white transition"
            >
              <img
                src={slide.src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
      </div>


      {/* Controls */}
      <button
        onClick={prevSlide}
        className="
    absolute 
    top-1/2 
    left-2 
    md:left-4 
    transform -translate-y-1/2 
    bg-black/50 
    backdrop-blur-sm 
    text-white 
    p-2 
    md:p-3 
    rounded-full 
    hover:bg-white/30 
    transition 
    z-10
  "
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 md:w-5 md:h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>


      <button
        onClick={nextSlide}
        className="
    absolute
    top-1/2
    right-2
    md:right-4
    transform -translate-y-1/2
    bg-black/50
    backdrop-blur-sm
    text-white
    p-2
    md:p-3
    rounded-full
    hover:bg-white/30
    transition
    z-10
  "
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 md:w-5 md:h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>


      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-8 h-1 rounded-full ${currentIndex === i ? "bg-white w-20" : "bg-gray-400"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
