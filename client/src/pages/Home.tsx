import React from "react";
import Categories from "./Categories";
import ImageSlider from "../components/ImageSlider/ImageSlider";

const trendingAssets = [
  { id: 1, name: "MintedGold", price: "SOL 1.00005" },
  { id: 2, name: "MintedGold", price: "SOL 1.00005" },
  { id: 3, name: "MintedGold", price: "SOL 1.00005" },
  { id: 4, name: "MintedGold", price: "SOL 1.00005" },
  { id: 5, name: "MintedGold", price: "SOL 1.00005" },
  { id: 6, name: "MintedGold", price: "SOL 1.00005" },
];

const HighestAssets = [
  { id: 1, name: "MintedGold", price: "SOL 1.00005" },
  { id: 2, name: "MintedGold", price: "SOL 1.00005" },
  { id: 3, name: "MintedGold", price: "SOL 1.00005" },
  { id: 4, name: "MintedGold", price: "SOL 1.00005" },
  { id: 5, name: "MintedGold", price: "SOL 1.00005" },
  { id: 6, name: "MintedGold", price: "SOL 1.00005" },
  { id: 7, name: "MintedGold", price: "SOL 1.00005" },
  { id: 8, name: "MintedGold", price: "SOL 1.00005" },
];

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
          <div className="h-[300px] bg-black flex-col gap-5 p-5 flex">
            <div>
              <div className="text-white font-bold flex justify-start">
                Trending Assets
              </div>
            </div>
            {[0, 1].map((rowIndex) => (
              <div key={rowIndex} className="w-full flex-1 flex gap-5">
                {trendingAssets.slice(rowIndex * 3, rowIndex * 3 + 3).map((asset) => (
                  <div
                    key={asset.id}
                    className="w-1/3 flex items-center border border-gray-500 rounded-md bg-gray-500 text-black p-4"
                  >
                    <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full text-black font-semibold">
                      {/* {asset.id} */}
                    </div>
                    <div className="flex flex-col justify-between ml-4">
                      <div className="text-lg font-bold">{asset.name}</div>
                      <div className="text-sm">{asset.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Weekly Highest Sales */}
          <div className="h-[320px] bg-black flex-col flex gap-5 p-5">
            <div>
              <div className="text-white font-bold flex justify-start">
                Weekly Highest Sales
              </div>
            </div>
            <div className="w-full flex-1 flex gap-5">
              <div className="w-1/3 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black p-2">
                {/* Box with number 1 */}
                <div className="flex-1 flex justify-center items-center bg-white w-full h-full rounded-md ">
                  {/* image */}
                </div>

                {/* Box divided into 3 horizontal sections */}
                <div className="flex-1 flex flex-col justify-between p-2 gap-2">
                  <div className="text-lg font-bold">AurumCraft</div>
                  <div className="text-xs">Aurum is Latin for gold; sounds premium.</div>
                  <div className="text-sm font-semibold">
                    <div className="flex px-1  py-1 bg-black/60 rounded-xl border border-gray-600 shadow-md">
                      {/* Column 1 */}
                      <div className="flex-1 px-1 flex flex-col items-center justify-center text-center">
                        <div className="text-[10px] text-gray-300">FLOOR PRICE</div>
                        <div className="font-semibold mt-1 text-white text-xs">SOL 15.00</div>
                      </div>

                      {/* Divider */}
                      <div className="w-px bg-gray-500 mx-3"></div>

                      {/* Column 2 */}
                      <div className="flex-1 px-1 flex flex-col items-center justify-center text-center">
                        <div className="text-[10px] text-gray-300">FLOOR PRICE</div>
                        <div className="font-semibold mt-1 text-white text-xs">SOL 15.00</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="bg-green-800 text-white px-4 py-1 rounded hover:bg-gray-800 w-full">
                      Action
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-2/9 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black"></div>
              <div className="w-2/9 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black"></div>
              <div className="w-2/9 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black"></div>
            </div>
          </div>

          {/* Highest Assets */}
          <div className="h-[400px] bg-black flex-col flex gap-5 p-5">
            <div>
              <div className="text-white font-bold flex justify-start">
                Highest Assets
              </div>
            </div>
            {[0, 1].map((rowIndex) => (
              <div key={rowIndex} className="w-full flex-1 flex gap-5">
                {HighestAssets.slice(rowIndex * 4, rowIndex * 4 + 4).map((asset) => (
                  <div
                    key={asset.id}
                    className="w-1/4 flex items-center border border-gray-500 rounded-md bg-gray-500 text-black p-4"
                  >
                    <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full text-black font-semibold">
                      {/* {asset.id} */}
                    </div>
                    <div className="flex flex-col justify-between ml-4">
                      <div className="text-lg font-bold">{asset.name}</div>
                      <div className="text-sm">{asset.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
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
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black"></div>
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black"></div>
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black"></div>
              <div className="w-1/4 flex justify-center items-center border border-gray-500 rounded-md bg-gray-500 text-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
