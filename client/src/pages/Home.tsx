import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import { useNavigate } from "react-router-dom";

// Import reusable listing services
import {
  fetchLimitedListings,
} from "../services/listingService";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1618005182386-a1a8f4f6a0a3?q=80&w=1332&auto=format&fit=crop";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [trendingAssets, setTrendingAssets] = useState<any[]>([]);
  const [weeklyHighestSales, setWeeklyHighestSales] = useState<any[]>([]);
  const [highestAssets, setHighestAssets] = useState<any[]>([]);
  const [featuredSale, setFeaturedSale] = useState<any>(null);

  // ------------------------------------------------------------------
  // LOAD ALL LISTS USING REUSABLE SERVICE
  // ------------------------------------------------------------------
  useEffect(() => {
    const loadAll = async () => {
      // 1. TRENDING
      const trending = await fetchLimitedListings(6);
      setTrendingAssets(
        trending.map((item, index) => ({
          id: index + 1,
          name: item.nftName,
          price: `${item.price} ${item.currency}`,
          Status: index % 3 === 0 ? "NEW" : "",
          changedPrice: `${item.price} ${item.currency}`,
          Change: index % 2 === 0 ? "+" : "-",
        }))
      );

      // 2. WEEKLY HIGHEST SALES
      const weekly = await fetchLimitedListings(4);
      setWeeklyHighestSales(
        weekly.map((item, index) => ({
          id: index + 1,
          name: item.nftName,
          price: `${item.price} ${item.currency}`,
          image: item.imageUrl || PLACEHOLDER_IMAGE,
          description: item.description || "Top traded asset of the week.",
        }))
      );

      // Featured sale = first one
      setFeaturedSale(weekly[0]);

      // 3. HIGHEST ASSETS
      const highest = await fetchLimitedListings(4);
      setHighestAssets(
        highest.map((item, index) => ({
          id: index + 1,
          name: item.nftName,
          price: `${item.price} ${item.currency}`,
          change: `${Math.floor(Math.random() * 10 - 5)}%`,
          image: item.imageUrl || PLACEHOLDER_IMAGE,
        }))
      );
    };

    loadAll();
  }, []);

  const Articles = [
    {
      id: 1,
      title: "Understanding NFTs",
      content: "A deep dive into the world of NFTs.",
    },
    {
      id: 2,
      title: "The Future of Digital Art",
      content: "Exploring the evolution of digital art.",
    },
    {
      id: 3,
      title: "Blockchain Technology",
      content: "How blockchain is revolutionizing industries.",
    },
    {
      id: 4,
      title: "Investing in NFTs",
      content: "Tips and strategies for investing in NFTs.",
    },
  ];

  return (
    <div className="flex bg-black">
      <div className="flex-1 bg-white min-h-screen">

        <Categories />

        {/* Image Slider */}
        <div className="flex flex-col bg-black">
          <div className="px-5 w-full h-[500px] bg-black">
            <ImageSlider />
          </div>

          {/* ---------------------------------------------------------
              TRENDING ASSETS
          ---------------------------------------------------------- */}
          <div className="h-[300px] bg-black flex-col gap-5 p-5 flex">
            <div className="text-white font-bold">Trending Assets</div>

            {[0, 1].map((rowIndex) => (
              <div key={rowIndex} className="w-full flex-1 flex gap-5">
                {trendingAssets.slice(rowIndex * 3, rowIndex * 3 + 3).map((asset) => (
                  <div
                    key={asset.id}
                    className="w-1/3 flex items-center border border-gray-500 rounded-md bg-gray-500 text-white p-4"
                  >
                    <div className="flex flex-col ml-4">
                      <div className="flex text-lg font-bold gap-5">
                        {asset.name}
                        {asset.Status && (
                          <div className="text-[10px] bg-green-800 px-2 rounded-sm">
                            {asset.Status}
                          </div>
                        )}
                      </div>

                      <div className="text-sm flex gap-5 pt-1">
                        <div className="text-gray-300">{asset.price}</div>

                        <div className="text-gray-300 text-xs">
                          {asset.changedPrice}{" "}
                          <span className={asset.Change === "+" ? "text-green-500" : "text-red-500"}>
                            {asset.Change}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------------
              WEEKLY HIGHEST SALES
          ---------------------------------------------------------- */}
          <div className="h-[320px] bg-black flex flex-col gap-5 p-5">
            <div className="text-white font-bold">Weekly Highest Sales</div>

            <div className="w-full flex gap-5">
              {featuredSale && (
                <div className="w-1/3 flex border border-gray-500 rounded-md bg-gray-500 text-black p-2 h-56">
                  <div className="w-1/2 flex justify-center items-center bg-white rounded-md">
                    <img
                      src={featuredSale.imageUrl}
                      alt={featuredSale.nftName}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="w-1/2 flex flex-col justify-between p-2">
                    <div className="text-lg font-bold">{featuredSale.nftName}</div>
                    <div className="text-xs">{featuredSale.description}</div>

                    <div className="flex px-2 py-1 bg-black/60 rounded-xl border border-gray-600">
                      <div className="flex-1 text-center">
                        <div className="text-[10px] text-gray-300">FLOOR PRICE</div>
                        <div className="text-white text-xs font-semibold">
                          {featuredSale.price} {featuredSale.currency}
                        </div>
                      </div>

                      <div className="w-px bg-gray-500 mx-3"></div>

                      <div className="flex-1 text-center">
                        <div className="text-[10px] text-gray-300">24H VOLUME</div>
                        <div className="text-white text-xs font-semibold">
                          {featuredSale.price * 10} {featuredSale.currency}
                        </div>
                      </div>
                    </div>

                    <button className="bg-green-800 text-white px-4 py-1 rounded">
                      Buy Now
                    </button>
                  </div>
                </div>
              )}

              <div className="flex-1 flex gap-5">
                {weeklyHighestSales.slice(1).map((asset) => (
                  <div
                    key={asset.id}
                    className="w-1/3 border border-gray-500 rounded-md bg-gray-500 text-black flex flex-col"
                  >
                    <div className="bg-white rounded-md h-3/4">
                      <img
                        src={asset.image}
                        alt={asset.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="p-2">
                      <div className="text-lg font-bold">{asset.name}</div>
                      <div className="text-sm">{asset.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------
              HIGHEST ASSETS
          ---------------------------------------------------------- */}
          <div className="h-[320px] bg-black flex flex-col gap-5 p-5">
            <div className="text-white font-bold">Highest Assets</div>

            <div className="flex gap-6">
              {highestAssets.map((asset) => (
                <div key={asset.id} className="relative w-full h-56 rounded-md overflow-hidden">
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-2 text-white text-sm">
                    <p className="font-semibold">{asset.name}</p>
                    <p>
                      Price: {asset.price}
                      <span
                        className={`ml-5 ${
                          asset.change.startsWith("-")
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {asset.change}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------
              ARTICLES / HOW NFT WORKS
          ---------------------------------------------------------- */}
          <div className="h-[350px] bg-black flex flex-col gap-5 p-5 mb-5">
            <div className="text-white font-bold">How NFT Works</div>

            <div className="text-xs text-white">
              A fusion of timeless elegance and digital innovation — this NFT captures
            </div>

            <div className="flex gap-5">
              {Articles.map((article) => (
                <div
                  key={article.id}
                  onClick={() =>
                    article.title === "Understanding NFTs" &&
                    navigate("/hownftsworks")
                  }
                  className="w-1/4 flex flex-col items-center border border-gray-500 rounded-md bg-gray-500 text-black cursor-pointer"
                >
                  <div className="w-full h-40 bg-white rounded-md mb-4"></div>

                  <div className="text-lg text-center mb-2 px-2 w-full">
                    {article.title}
                    <span className="block text-xs text-gray-400 text-right cursor-pointer">
                      Read more
                    </span>
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
