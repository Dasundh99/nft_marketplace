import React from "react";
import Categories from "./Categories";
import ImageSlider from "../components/ImageSlider/ImageSlider";

const images = [
  "https://images.unsplash.com/photo-1718752773168-a44aa1601ddd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1618615580649-1a4bc3bea1e5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1714548870002-d25e8329039c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1605821771565-35e0d046a2fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          <div className="h-[400px] bg-black flex items-center justify-center ">
            <div className="p-4">
              <ImageSlider images={images} interval={4000} />
            </div>
          </div>


          <div className="h-[400px] bg-black flex-col flex items-center justify-center gap-5 p-5">
            <div>
              <div>Trending Assets</div>
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


          <div className="h-[300px] bg-black flex-col flex items-center justify-center gap-5 p-5">
            <div>
              <div>Weekly Highest Sales </div>
            </div>

            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">1</div>
              <div className="w-2/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black">2</div>
            </div>
          </div>


          <div className="h-[500px] bg-black flex-col flex items-center justify-center gap-5 p-5">
            <div>
              <div>Highest Assets</div>
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


          <div className="h-[300px] bg-black flex-col flex items-center justify-center gap-5 p-5">
            <div>
              <div>How NFT Works</div>
            </div>

            <div>
              <div>"A fusion of timeless elegance and digital innovation — this NFT captures</div>
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
