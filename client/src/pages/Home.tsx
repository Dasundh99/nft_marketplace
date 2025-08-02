import React from "react";
import Categories from "./Categories";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import Image1 from "../assets/Slider1.jpg";

const images = [
  Image1,
  Image1,
  Image1,
  Image1,
];

const Home: React.FC = () => {
  return (
    <div className="flex bg-black">
      <div className="flex-1 bg-white transition-colors duration-200 min-h-screen">
        {/* Header and Categories */}
        <div>
          <Categories />
        </div>

        <div className="flex flex-col bg-white">
          <div className="h-[400px] w-full bg-black flex items-center justify-center ">
            <div className="p-5">
              <ImageSlider images={images} interval={4000} />
            </div>
          </div>


          <div className="h-[400px] bg-black flex-col gap-5 p-5 flex">
            <div>
              <div className="text-white font-bold flex justify-start">Trending Assets</div>
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


          <div className="h-[300px] bg-black flex-col flex gap-5 p-5">
            <div>
              <div className="text-white font-bold flex justify-start">Weekly Highest Sales </div>
            </div>

            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">1</div>
              <div className="w-2/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">2</div>
            </div>
          </div>


          <div className="h-[500px] bg-black flex-col flex gap-5 p-5">
            <div>
              <div className="text-white font-bold flex justify-start">Highest Assets</div>
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


          <div className="h-[300px] bg-black flex-col flex gap-5 p-5">
            <div>
              <div className="text-white font-bold flex justify-start">How NFT Works</div>
            </div>

            <div>
              <div className="text-xs">"A fusion of timeless elegance and digital innovation — this NFT captures</div>
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
