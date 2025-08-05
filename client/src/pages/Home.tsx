import React from "react";
import Categories from "./Categories";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import productImage1 from "../assets/Product1.svg";
import productImage2 from "../assets/Product2.svg";
import productImage3 from "../assets/Product3.svg";
import productImage4 from "../assets/Product4.svg";

const trendingAssets = [
  { id: 1, name: "MintedGold", price: "SOL 1.00005", Status: "NEW", changedPrice: "SOL 1.00005", Change: "-" },
  { id: 2, name: "MintedGold", price: "SOL 1.00005", Status: "", changedPrice: "SOL 1.00005", Change: "+" },
  { id: 3, name: "MintedGold", price: "SOL 1.00005", Status: "", changedPrice: "SOL 1.00005", Change: "+" },
  { id: 4, name: "MintedGold", price: "SOL 1.00005", Status: "NEW", changedPrice: "SOL 1.00005", Change: "-" },
  { id: 5, name: "MintedGold", price: "SOL 1.00005", Status: "NEW", changedPrice: "SOL 1.00005", Change: "-" },
  { id: 6, name: "MintedGold", price: "SOL 1.00005", Status: "", changedPrice: "SOL 1.00005", Change: "+" },
];

const HighestSales = [
  { id: 1, name: "MintedGold", price: "SOL 1.00005" },
  { id: 2, name: "MintedGold", price: "SOL 1.00005" },
  { id: 3, name: "MintedGold", price: "SOL 1.00005" },
];

const highestAssets = [
  {
    id: 1,
    name: "NFTreasures",
    price: "$15.05",
    change: "-1.6%",
    image: productImage1,
  },
  {
    id: 2,
    name: "NFTreasures",
    price: "$15.05",
    change: "-1.6%",
    image: productImage2,
  },
  {
    id: 3,
    name: "NFTreasures",
    price: "$15.05",
    change: "-1.6%",
    image: productImage3,
  },
  {
    id: 4,
    name: "NFTreasures",
    price: "$15.05",
    change: "-1.6%",
    image: productImage4,
  },
];


const Articles = [
  { id: 1, title: "Understanding NFTs", content: "A deep dive into the world of NFTs." },
  { id: 2, title: "The Future of Digital Art", content: "Exploring the evolution of digital art." },
  { id: 3, title: "Blockchain Technology", content: "How blockchain is revolutionizing industries." },
  { id: 4, title: "Investing in NFTs", content: "Tips and strategies for investing in NFTs." },
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
                    className="w-1/3 flex items-center border border-gray-500 rounded-md bg-gray-500 text-white p-4"
                  >
                    <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full text-black font-semibold">
                      {/* {asset.id} */}
                    </div>
                    <div className="flex flex-col justify-between ml-4">
                      <div className="flex text-lg font-bold gap-5">
                        <div>{asset.name}</div>
                        {asset.Status && (
                          <div className="text-[10px] font-medium text-white bg-green-800 px-2 rounded-sm shadow-sm flex items-center">
                            {asset.Status}
                          </div>
                        )}
                      </div>

                      <div className="text-sm flex gap-5 pt-1 items-center">
                        <div className="text-gray-400 font-semibold">
                          {asset.price}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {asset.changedPrice} <span className={`text-${asset.Change === "+" ? "green" : "red"}-500`}>{asset.Change}</span>
                        </div>
                      </div>
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
                <div className="flex-1 flex justify-center items-center bg-white w-full h-full rounded-md ">
                  {/* image */}
                </div>

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

              <div className="flex gap-5 flex-1 h-64">
                {HighestSales.map((asset) => (
                  <div
                    key={asset.id}
                    className="w-1/3 border border-gray-500 rounded-md bg-gray-500 text-black flex flex-col"
                  >
                    <div className="bg-white rounded-md w-full flex justify-center items-center" style={{ flexBasis: "75%" }}>
                      {/* image */}
                    </div>
                    <div className="mt-2 flex flex-col flex-grow justify-center pl-2">
                      <div className="text-lg font-bold">{asset.name}</div>
                      <div className="text-sm">{asset.price}</div>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </div>

          {/* Highest Assets */}
          <div className="h-[350px] bg-black flex-col flex gap-5 p-5 justify-center">
            <div className="text-white font-bold flex justify-start">
              Highest Assets
            </div>

            <div className="grid grid-cols-4 gap-6 mt-5">
              {highestAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="relative w-full h-auto rounded-md overflow-hidden"
                >
                  <img
                    src={asset.image}
                    alt={`Product Image ${asset.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-transparent text-white text-sm p-2">
                    <p className="font-semibold">{asset.name}</p>
                    <p>
                      Price: {asset.price}
                      <span className="text-red-400 ml-5">{asset.change}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* How NFT Works */}
          <div className="h-[320px] bg-black flex-col flex gap-5 p-5">
            <div>
              <div className="text-white font-bold flex justify-start">
                How NFT Works
              </div>
            </div>
            <div>
              <div className="text-xs text-white">
                A fusion of timeless elegance and digital innovation — this NFT captures
              </div>
            </div>
            <div className="w-full flex-1 flex gap-5">
              {Articles.map((article) => (
                <div
                  key={article.id}
                  className="w-1/4 flex flex-col items-center border border-gray-500 rounded-md bg-gray-500 text-black"
                >
                  {/* Image Placeholder */}
                  <div className="w-full h-40 bg-white rounded-md mb-4 flex justify-center items-center">
                    {/* Replace with actual image if needed */}
                    <span className="text-gray-400 text-sm">Image</span>
                  </div>

                  {/* Title */}
                  <div className="text-lg font-bold text-center mb-2">
                    {article.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
