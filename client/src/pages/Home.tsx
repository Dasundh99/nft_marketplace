import React from "react";
import Categories from "./Categories";

const Home: React.FC = () => {
  return (
    <div className="flex">
      <div className="ml-20 flex-1 bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen">
        {/* Header and Categories */}
        <div>
          <Categories />
        </div>

        <div className="flex flex-col">
          <div className="h-[500px] bg-black flex items-center justify-center">
            <p>Section 1</p>
          </div>


          <div className="h-[400px] bg-black flex-col flex items-center justify-center gap-5 p-5">
            <div>
              <div>Trending Assets</div>
            </div>
            
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">1</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">2</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">3</div>
            </div>

            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">4</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">5</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">6</div>
            </div>
          </div>


          <div className="h-[300px] bg-black flex-col flex items-center justify-center gap-5 p-5">
            <div>
              <div>Weekly Highest Sales </div>
            </div> 
            
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">1</div>
              <div className="w-2/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">2</div>
            </div>
          </div>
  

          <div className="h-[500px] bg-black flex-col flex items-center justify-center gap-5 p-5">
            <div>
              <div>Highest Assets</div>
            </div>
            
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">1</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">2</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">3</div>
            </div>

            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">4</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">5</div>
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">6</div>
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
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">1</div>
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">2</div>
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">3</div>
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-200 text-black">4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
