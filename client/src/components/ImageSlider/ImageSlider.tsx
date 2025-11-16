import React, { useState, useEffect, useRef } from "react";
import {
  fetchLimitedListings,
} from "../../services/listingService";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1618005182386-a1a8f4f6a0a3?q=80&w=1332&auto=format&fit=crop";

interface Slide {
  src: string;
  name: string;
  by: string;
  texts: string[];
}

const ImageSlider: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // -----------------------------------------------------------
  // Fetch listings from reusable service
  // -----------------------------------------------------------
  useEffect(() => {
    const loadSlides = async () => {
      setLoading(true);

      const listings = await fetchLimitedListings(4); // <--- Fetch from service

      const formattedSlides: Slide[] = listings.map((item) => ({
        src: item.imageUrl || PLACEHOLDER_IMAGE,
        name: item.nftName || item.nftMint.slice(0, 8) + "...",
        by: `by ${item.seller.slice(0, 8)}...`,
        texts: ["Price", `${item.price} ${item.currency}`],
      }));

      setSlides(formattedSlides);
      setLoading(false);
    };

    loadSlides();
  }, []);

  // -----------------------------------------------------------
  // Auto-slide logic
  // -----------------------------------------------------------
  useEffect(() => {
    if (!slides.length || loading) return;

    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
      }, 4000);
    };

    startInterval();

    const slider = sliderRef.current;
    if (slider) {
      const pause = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };

      const resume = () => {
        if (!intervalRef.current && slides.length > 1) startInterval();
      };

      slider.addEventListener("mouseenter", pause);
      slider.addEventListener("mouseleave", resume);
      slider.addEventListener("touchstart", pause);

      return () => {
        slider.removeEventListener("mouseenter", pause);
        slider.removeEventListener("mouseleave", resume);
        slider.removeEventListener("touchstart", pause);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [slides, loading]);

  // Pause and resume on manual navigation
  const handleNavigation = (newIndex: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setCurrentIndex(newIndex);

    setTimeout(() => {
      if (!slides.length || loading) return;
      intervalRef.current = setInterval(() => {
        setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
      }, 4000);
    }, 2000);
  };

  // -----------------------------------------------------------
  // Loading state
  // -----------------------------------------------------------
  if (loading)
    return (
      <div className="w-full h-[450px] bg-black rounded-2xl flex items-center justify-center">
        <div className="text-white">Loading featured NFTs...</div>
      </div>
    );

  if (!slides.length)
    return (
      <div className="w-full h-[450px] bg-black rounded-2xl flex items-center justify-center">
        <div className="text-white">No active listings.</div>
      </div>
    );

  // -----------------------------------------------------------
  // Slider UI
  // -----------------------------------------------------------
  return (
    <div
      ref={sliderRef}
      className="relative w-full h-[450px] overflow-hidden rounded-2xl shadow-2xl group"
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => {
          const isActive = i === currentIndex;
          const [label, value] = slide.texts;

          return (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-1000 ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.name}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Text */}
              <div className="absolute bottom-8 left-8 text-white space-y-2">
                <h2 className="text-3xl font-bold">{slide.name}</h2>
                <p className="opacity-80">{slide.by}</p>

                <div className="bg-black/40 rounded-xl px-4 py-2 w-fit">
                  <p className="text-xs uppercase opacity-60">{label}</p>
                  <p className="text-lg font-bold">{value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <button
        onClick={() =>
          handleNavigation(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full"
      >
        ‹
      </button>

      <button
        onClick={() =>
          handleNavigation(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleNavigation(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
