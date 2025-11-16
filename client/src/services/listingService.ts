// src/services/listingService.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const metaplex = new Metaplex(connection);

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1618005182386-a1a8f4f6a0a3?q=80&w=1332&auto=format&fit=crop";

// -------------------------------
// 1. Normalize image URL from IPFS, CID, or http
// -------------------------------
export const safeImageUrl = (url?: string) => {
  if (!url) return PLACEHOLDER_IMAGE;

  if (url.startsWith("http")) return url;

  if (url.startsWith("ipfs://")) {
    const cid = url.replace("ipfs://", "");
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  }

  // Raw CID
  if (url.length >= 46 && !url.includes(".")) {
    return `https://gateway.pinata.cloud/ipfs/${url}`;
  }

  return PLACEHOLDER_IMAGE;
};

// -------------------------------
// 2. Fetch Metadata for a Mint
// -------------------------------
export const fetchNFTData = async (mint: string) => {
  try {
    const nft = await metaplex.nfts().findByMint({
      mintAddress: new PublicKey(mint),
    });

    return {
      image: safeImageUrl(nft.json?.image),
      name: nft.json?.name || `${mint.slice(0, 10)}...`,
    };
  } catch (err) {
    console.error("⚠️ NFT Metadata fetch error:", err);
    return {
      image: PLACEHOLDER_IMAGE,
      name: mint.slice(0, 10) + "...",
    };
  }
};

// -------------------------------
// Listing Interface
// -------------------------------
export interface Listing {
  description: string;
  id: string;
  nftMint: string;
  price: number;
  currency: string;
  seller: string;
  status: string;
  imageUrl?: string;
  nftName?: string;
}

// -------------------------------
// 3. Fetch All Listings + NFT Metadata
// -------------------------------
export const fetchAllListings = async (): Promise<Listing[]> => {
  try {
    const snap = await getDocs(collection(db, "listings"));

    const listings: Listing[] = await Promise.all(
      snap.docs.map(async (doc) => {
        const data = doc.data();
        const nftData = await fetchNFTData(data.nftMint);

        return {
          id: doc.id,
          description: data.description,
          nftMint: data.nftMint,
          price: data.price,
          currency: data.currency,
          seller: data.seller,
          status: data.status,
          imageUrl: nftData.image,
          nftName: nftData.name,
        };
      })
    );

    return listings;
  } catch (error) {
    console.error("🔥 Failed to fetch listings:", error);
    return [];
  }
};

// -------------------------------
// 4. Filter Only Active Listings
// -------------------------------
export const fetchActiveListings = async () => {
  const all = await fetchAllListings();
  return all.filter((l) => l.status !== "cancelled");
};

// -------------------------------
// 5. Fetch Limited Listings (for slider, trending, etc.)
// -------------------------------
export const fetchLimitedListings = async (limit: number) => {
  const active = await fetchActiveListings();
  return active.slice(0, limit);
};
