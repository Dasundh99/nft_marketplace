// components/ImageSlider.tsx
import React, { useState } from "react";

interface ImageSliderProps {
    images: string[];
    interval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Optional: auto-slide
    React.useEffect(() => {
        const slide = setInterval(nextSlide, interval);
        return () => clearInterval(slide);
    }, [currentIndex, interval]);

    return (
        <div className="relative w-full max-w-fit overflow-hidden rounded-lg">
            {/* Slide Images */}
            <div
                className="w-full flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, index) => (
                    <div key={index} className="relative w-full flex-shrink-0">
                        {/* Image */}
                        <img
                            src={src}
                            className="w-full object-cover h-64 sm:h-96 opacity-50"
                            alt={`Slide ${index + 1}`}
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 flex items-baseline-last justify-start p-10">
                            <div className="text-white text-sm ">
                                <div className="flex-col ">
                                    <div className="flex py-2">MintedGold</div>
                                    <div className="flex gap-5 px-3 py-1 bg-black/50 rounded-lg"> 
                                        <div className="flex-1 ">
                                            <div className="flex-1">Text 1</div>
                                            <div className="flex-1">Text 2</div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex-1">Text 3</div>
                                            <div className="flex-1">Text 4</div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex-1">Text 5</div>
                                            <div className="flex-1">Text 6</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition"
                aria-label="Previous Slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition"
                aria-label="Next Slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-4 gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-8 h-1 rounded-full ${currentIndex === i ? "bg-white w-20" : "bg-gray-400"}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
