import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const metaplex = new Metaplex(connection);

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1618005182386-a1a8f4f6a0a3?q=80&w=1332&auto=format&fit=crop";

// Firestore listing interface
interface Listing {
  id: string;
  nftMint: string;
  price: number;
  currency: string;
  seller: string;
  status: string;
  imageUrl?: string;
}

// Normalize image URL to avoid 403 / missing metadata issues
const safeImageUrl = (url: string | undefined) => {
  if (!url) return PLACEHOLDER_IMAGE;

  // If already valid http link, return as is
  if (url.startsWith("http")) return url;

  // If ipfs://CID → convert
  if (url.startsWith("ipfs://")) {
    const cid = url.replace("ipfs://", "");
    
    // Primary Pinata gateway
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  }

  // If backend stored raw CID
  if (url.length >= 46 && !url.includes(".")) {
    return `https://gateway.pinata.cloud/ipfs/${url}`;
  }

  return PLACEHOLDER_IMAGE;
};

// Fetch NFT image using Metaplex Metadata
const fetchNFTImage = async (mint: string) => {
  try {
    const nft = await metaplex.nfts().findByMint({
      mintAddress: new PublicKey(mint),
    });

    const img = nft.json?.image;

    // Return a safe version
    return safeImageUrl(img);
  } catch (error) {
    console.error("❌ Error fetching NFT metadata:", error);
    return PLACEHOLDER_IMAGE;
  }
};

const ImageSlider: React.FC = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch listings + NFT metadata images
  useEffect(() => {
    const loadListings = async () => {
      try {
        const snap = await getDocs(collection(db, "listings"));

        const listings: Listing[] = await Promise.all(
          snap.docs.map(async (doc) => {
            const data = doc.data();
            const img = await fetchNFTImage(data.nftMint);

            return {
              id: doc.id,
              nftMint: data.nftMint,
              price: data.price,
              currency: data.currency,
              seller: data.seller,
              status: data.status,
              imageUrl: img,
            };
          })
        );

        const active = listings.filter((l) => l.status !== "cancelled");

        const preparedSlides = active.slice(0, 4).map((item) => ({
          src: item.imageUrl,
          name: item.nftMint.slice(0, 10) + "...",
          by: `by ${item.seller.slice(0, 8)}...`,
          texts: [
            "Floor Price",
            `${item.price} ${item.currency}`,
              // "Floor Price",
            // `${(item.price * 0.9).toFixed(2)} ${item.currency}`,
            // "Floor Price",
            // `${(item.price * 1.1).toFixed(2)} ${item.currency}`,
          ],
        }));

        setSlides(preparedSlides);
      } catch (err) {
        console.error("🔥 Failed to fetch listings:", err);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  // Auto-slide every 3s
  useEffect(() => {
    if (!slides.length || loading) return;

    const interval = setInterval(() => {
      setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [slides, loading]);

  if (loading)
    return (
      <div className="w-full h-120 bg-gray-800 flex items-center justify-center">
        Loading slides...
      </div>
    );

  if (!slides.length)
    return (
      <div className="w-full h-120 bg-gray-800 flex items-center justify-center">
        No active listings.
      </div>
    );

  const current = slides[currentIndex];

  return (
    <div className="relative w-full">
      {/* Background Image */}
      <img
        src={current.src}
        className="w-full object-cover h-120 opacity-50"
        alt={`Slide ${currentIndex}`}
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-baseline-last justify-start py-10 px-5">
        <div className="text-white max-w-md">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-extrabold tracking-wide">{current.name}</p>
            <p className="text-sm tracking-wide">{current.by}</p>

            <div className="flex px-6 py-5 bg-black/60 rounded-xl border border-gray-600 shadow-md">
              {current.texts.map((text: string, i: number) => (
                <div key={i} className="flex-1 px-4">
                  <p className="text-sm text-gray-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
      >
        ›
      </button>

      {/* Slide Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1 rounded-full transition-all ${
              currentIndex === i ? "bg-white w-20" : "bg-gray-400 w-8"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
