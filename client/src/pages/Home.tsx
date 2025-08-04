import React from "react";
import Categories from "./Categories";
import ImageSlider from "../components/ImageSlider/ImageSlider"; // Ensure path is correct

const Home: React.FC = () => {
  return (
    <div className="flex bg-black">
      <div className="flex-1 bg-white transition-colors duration-200 min-h-screen">
        {/* Header and Categories */}
        <div>
          <Categories />
        </div>

        {/* Image Slider - Full Width */}
        <div className="flex flex-col bg-black">
          <div className="px-5 w-full h-[500px] bg-black">
            <ImageSlider />
          </div>

          {/* Trending Assets */}
          <div className="h-[400px] bg-black flex-col gap-5 p-5 flex">
            <div>
              <div className="text-white font-bold flex justify-start">
                Trending Assets
              </div>
            </div>
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">1</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">2</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">3</div>
            </div>
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">4</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">5</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">6</div>
            </div>
          </div>

          {/* Weekly Highest Sales */}
          <div className="h-[300px] bg-black flex-col flex gap-5 p-5">
            <div>
              <div className="text-white font-bold flex justify-start">
                Weekly Highest Sales
              </div>
            </div>
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">1</div>
              <div className="w-2/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">2</div>
            </div>
          </div>

          {/* Highest Assets */}
          <div className="h-[500px] bg-black flex-col flex gap-5 p-5">
            <div>
              <div className="text-white font-bold flex justify-start">
                Highest Assets
              </div>
            </div>
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">1</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">2</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">3</div>
            </div>
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">4</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">5</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">6</div>
            </div>
          </div>

          {/* How NFT Works */}
          <div className="h-[300px] bg-black flex-col flex gap-5 p-5">
            <div>
              <div className="text-white font-bold flex justify-start">
                How NFT Works
              </div>
            </div>
            <div>
              <div className="text-xs text-white">
                "A fusion of timeless elegance and digital innovation — this NFT captures"
              </div>
            </div>
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">1</div>
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">2</div>
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">3</div>
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
