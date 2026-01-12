import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  Metaplex,
  walletAdapterIdentity,
  type LazyListing,
} from "@metaplex-foundation/js";
import toast, { Toaster } from "react-hot-toast";
import { AUCTION_HOUSE_ADDRESS, buyNFT } from "../utils/solana";
import { LifeLine } from "react-loading-indicators";
import { Link, useLocation } from "react-router-dom";



const RPC_URL = "https://api.devnet.solana.com";

interface ListedNFT {
  mintAddress: string;
  name: string;
  image: string;
  price: number;
  sellerAddress: string;
}

const ListedNFTs: React.FC = () => {
  const wallet = useWallet();
  const [listedNFTs, setListedNFTs] = useState<ListedNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();


  useEffect(() => {
    const fetchListings = async () => {
      if (!wallet.connected) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const connection = new Connection(RPC_URL, "confirmed");
        const metaplex = Metaplex.make(connection).use(
          walletAdapterIdentity(wallet as any)
        );

        // 1️⃣ Get Auction House
        const auctionHouse = await metaplex
          .auctionHouse()
          .findByAddress({ address: new PublicKey(AUCTION_HOUSE_ADDRESS) });

        // 2️⃣ Get all active listings
        const listings = await metaplex.auctionHouse().findListings({
          auctionHouse,
        });

        const loadedListings: ListedNFT[] = [];

        // 3️⃣ Load each listing fully (and fetch image)
        for (const l of listings) {
          try {
            const listing = await metaplex
              .auctionHouse()
              .loadListing({ lazyListing: l as LazyListing });

            if (!listing.canceledAt) {
              const price =
                listing.price.basisPoints.toNumber() / 1_000_000_000;

              // Manually fetch IPFS metadata for the image
              let imageUrl = "/placeholder.png";
              try {
                if (listing.asset.uri) {
                  const metaRes = await fetch(listing.asset.uri);
                  const metaJson = await metaRes.json();
                  if (metaJson.image) {
                    imageUrl = metaJson.image.replace(
                      /^ipfs:\/\//,
                      "https://gateway.pinata.cloud/ipfs/"
                    );
                  }
                }
              } catch (metaErr) {
                console.warn("⚠️ Metadata fetch failed:", metaErr);
              }

              loadedListings.push({
                mintAddress: listing.asset.address.toBase58(),
                name: listing.asset.name || "Unnamed NFT",
                image: imageUrl,
                price,
                sellerAddress: listing.sellerAddress.toBase58(),
              });
            }
          } catch (err) {
            console.warn("⚠️ Failed to load listing:", err);
            continue;
          }
        }

        setListedNFTs(loadedListings);
      } catch (err) {
        console.error("❌ Failed to fetch listings:", err);
        toast.error("Failed to load NFTs.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [wallet.connected]);

 
  const handleBuy = async (mintAddress: string, price: number) => {
    if (!wallet.connected) {
      toast.error("Connect your wallet first.");
      return;
    }

    try {
      toast.loading("Processing purchase...");
      const tx = await buyNFT(wallet as any, mintAddress, price);

      toast.dismiss();
      toast.success(`✅ Purchased successfully!`);
      console.log("Transaction:", tx);

      // Remove the purchased NFT from the UI
      setListedNFTs((prev) =>
        prev.filter((nft) => nft.mintAddress !== mintAddress)
      );
    } catch (err: any) {
      toast.dismiss();
      console.error("💥 Purchase failed:", err);
      toast.error(err?.message || "Purchase failed.");
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">Listed NFTs</h1>

      {loading ? (
       

        <div className="flex items-center justify-center w-full h-full">
          <LifeLine color="green-400" size="medium" text="" textColor="" />
        </div>

      ) : listedNFTs.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          {wallet.connected
            ? "No NFTs listed for sale."
            : "Connect wallet to see listings."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listedNFTs.map((nft) => (
            <div
              key={nft.mintAddress}
              className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all"
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="rounded-xl mb-3 w-full h-52 object-cover bg-gray-700"
                onError={(e) => (e.currentTarget.src = "/placeholder.png")}
              />
              <h3 className="text-lg font-semibold truncate">{nft.name}</h3>
              <p className="text-gray-400 text-sm mb-2">
                Seller: {nft.sellerAddress.slice(0, 4)}...
                {nft.sellerAddress.slice(-4)}
              </p>
              <p className="text-yellow-400 font-bold mb-3">
                {nft.price.toFixed(4)} SOL
              </p>
              <Link
                              to={`/nft/${nft.mintAddress}`}
                              className="block mt-3 mb-3 text-blue-400"
                              state={{ from: location.pathname }}
                            >
                              View More
                            </Link>

              <button
                onClick={() => handleBuy(nft.mintAddress, nft.price)}
                disabled={!wallet.connected}
                className={`w-full py-2 rounded-lg font-semibold transition-all ${wallet.connected
                  ? "bg-green-600 hover:bg-green-700 active:scale-95"
                  : "bg-gray-600 cursor-not-allowed"
                  }`}
              >
                {wallet.connected ? "Buy Now" : "Connect Wallet"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListedNFTs;
