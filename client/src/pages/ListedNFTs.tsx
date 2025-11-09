// import React, { useEffect, useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { getMetaplex, AUCTION_HOUSE_ADDRESS } from "../utils/solana";
// import { PublicKey } from "@solana/web3.js";
// import type { WalletAdapter } from "@solana/wallet-adapter-base";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   updateDoc,
//   doc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { app } from "../utils/firebase";

// interface ListingInfo {
//   mintAddress: string;
//   name: string;
//   image: string;
//   price: number;
//   seller: string;
// }

// const ListedNFTs: React.FC = () => {
//   const wallet = useWallet();
//   const [listings, setListings] = useState<ListingInfo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [buying, setBuying] = useState<string | null>(null);

//   // ✅ Helper: extract wallet adapter
//   const getAdapter = (): WalletAdapter | null => {
//     if (wallet.wallet?.adapter) return wallet.wallet.adapter;
//     if ("name" in wallet) return wallet as unknown as WalletAdapter;
//     return null;
//   };

//   // ✅ Fetch listings
//   const fetchListings = async () => {
//     try {
//       setLoading(true);
//       const adapter = getAdapter();
//       if (!adapter) {
//         console.warn("No wallet adapter available");
//         return;
//       }

//       const metaplex = getMetaplex(adapter);
//       const auctionHouse = await metaplex
//         .auctionHouse()
//         .findByAddress({ address: new PublicKey(AUCTION_HOUSE_ADDRESS) });

//       // Fetch all listings (includes lazy)
//       const listingsData = await metaplex.auctionHouse().findListings({
//         auctionHouse,
//       });

//       // Load lazy listings
//       const fullListings = await Promise.all(
//         listingsData.map(async (listing: any) => {
//           if (listing.lazy) {
//             const loaded = await metaplex.auctionHouse().loadListing({
//               lazyListing: listing,
//             });
//             return loaded;
//           }
//           return listing;
//         })
//       );

//       // Format for UI
//       const formatted = fullListings.map((listing: any) => {
//         const metadata = listing.asset?.json || {};
//         return {
//           mintAddress: listing.asset.address.toBase58(),
//           name: metadata.name || "Unnamed NFT",
//           image: metadata.image || "",
//           price: listing.price.basisPoints.toNumber() / 1e9,
//           seller: listing.sellerAddress.toBase58(),
//         };
//       });

//       setListings(formatted);
//     } catch (error) {
//       console.error("❌ Failed to fetch listings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Buy NFT
// const buyNFT = async (mint: string, seller: string) => {
//   if (!wallet.connected) {
//     alert("Please connect your wallet first.");
//     return;
//   }

//   if (wallet.publicKey?.toBase58() === seller) {
//     alert("You cannot buy your own NFT.");
//     return;
//   }

//   try {
//     setBuying(mint);
//     const adapter = getAdapter();
//     if (!adapter) throw new Error("Wallet adapter not found");

//     const metaplex = getMetaplex(adapter);
//     const auctionHouse = await metaplex
//       .auctionHouse()
//       .findByAddress({ address: new PublicKey(AUCTION_HOUSE_ADDRESS) });

//     const listingsData = await metaplex.auctionHouse().findListings({ auctionHouse });

//     const allListings = await Promise.all(
//       listingsData.map(async (l: any) =>
//         l.lazy ? await metaplex.auctionHouse().loadListing({ lazyListing: l }) : l
//       )
//     );

//     const target = allListings.find(
//       (l: any) => l.asset.address.toBase58() === mint
//     );

//     if (!target) throw new Error("Listing not found");

//     // ✅ Execute the buy transaction
//     const { purchase } = await metaplex.auctionHouse().buy({
//       auctionHouse,
//       listing: target,
//     });

//     // 🧩 Extract the signature (works on 0.22–0.25)
//     // @ts-ignore
//     const signature = purchase?.response?.signature || "unknown";

//     console.log("✅ Purchase successful:", purchase);
//     console.log("🪙 Tx Signature:", signature);

//     // 🔹 Firestore update
//     const db = getFirestore(app);

//     await addDoc(collection(db, "purchases"), {
//       mintAddress: mint,
//       buyer: wallet.publicKey?.toBase58(),
//       seller: target.sellerAddress.toBase58(),
//       price: target.price.basisPoints.toNumber() / 1e9,
//       tx: signature,
//       createdAt: serverTimestamp(),
//     });

//     // Mark listing as sold in Firestore (optional)
//     try {
//       const listingDoc = doc(db, "listings", target.tradeStateAddress.toBase58());
//       await updateDoc(listingDoc, {
//         status: "sold",
//         updatedAt: serverTimestamp(),
//       });
//     } catch (e) {
//       console.warn("⚠️ Skipped Firestore listing update:", e);
//     }

//     alert("🎉 Purchase successful!");
//     await fetchListings(); // Refresh UI
//   } catch (err) {
//     console.error("❌ Purchase failed:", err);
//     alert("Purchase failed. Check console for details.");
//   } finally {
//     setBuying(null);
//   }
// };



//   // ✅ Load listings when wallet connects
//   useEffect(() => {
//     if (wallet.connected) fetchListings();
//   }, [wallet.connected]);

//   return (
//     <div className="p-6 text-white bg-gray-900 min-h-screen">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         🛒 Listed NFTs on Marketplace
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading listings...</p>
//       ) : listings.length === 0 ? (
//         <p className="text-center text-gray-400">No active listings found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {listings.map((nft) => (
//             <div
//               key={nft.mintAddress}
//               className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
//             >
//               {nft.image ? (
//                 <img
//                   src={nft.image}
//                   alt={nft.name}
//                   className="w-full h-64 object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400">
//                   No image
//                 </div>
//               )}

//               <div className="p-4 flex-1 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-lg font-bold">{nft.name}</h3>
//                   <p className="text-gray-400 text-sm break-all">
//                     {nft.mintAddress}
//                   </p>
//                 </div>

//                 <div className="mt-3">
//                   <p className="text-green-400 font-semibold">
//                     {nft.price} SOL
//                   </p>
//                   <p className="text-xs text-gray-500 truncate">
//                     Seller: {nft.seller.slice(0, 8)}...{nft.seller.slice(-8)}
//                   </p>

//                   <button
//                     onClick={() => buyNFT(nft.mintAddress, nft.seller)}
//                     disabled={buying === nft.mintAddress}
//                     className="mt-3 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition"
//                   >
//                     {buying === nft.mintAddress ? "Buying..." : "Buy NFT"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListedNFTs;


// import React, { useEffect, useState, useMemo } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { getMetaplex, AUCTION_HOUSE_ADDRESS } from "../utils/solana";
// import { PublicKey } from "@solana/web3.js";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   onSnapshot,
//   addDoc,
//   updateDoc,
//   doc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { app } from "../utils/firebase";

// type ListingData = {
//   id?: string;
//   nftMint: string;
//   name: string;
//   description?: string;
//   image?: string;
//   price: number;
//   currency: string;
//   seller: string;
//   status: string;
//   createdAt?: any;
// };

// const ListedNFTs: React.FC = () => {
//   const wallet = useWallet();
//   const publicKeyStr = useMemo(
//     () => wallet.publicKey?.toBase58() ?? null,
//     [wallet.publicKey]
//   );

//   const [listings, setListings] = useState<ListingData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [buying, setBuying] = useState<string | null>(null);

//   const db = getFirestore(app);

//   // 🔹 Load all ACTIVE listings in real time
//   useEffect(() => {
//     const listingsQ = query(
//       collection(db, "listings"),
//       where("status", "==", "active")
//     );

//     const unsub = onSnapshot(
//       listingsQ,
//       (snap) => {
//         const arr: ListingData[] = snap.docs.map((d) => ({
//           id: d.id,
//           ...(d.data() as ListingData),
//         }));
//         setListings(arr);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Error listening to listings:", err);
//         setLoading(false);
//       }
//     );

//     return () => unsub();
//   }, []);

//   // 🔹 Helper to get proper wallet adapter
//   const getAdapter = () => {
//     // use wallet directly — Metaplex accepts the adapter in v0.22–v0.25
//     return wallet as any;
//   };

//   // 🔹 Buy NFT
//   const buyNFT = async (mint: string, seller: string) => {
//     if (!wallet.connected) {
//       alert("Please connect your wallet first.");
//       return;
//     }

//     if (wallet.publicKey?.toBase58() === seller) {
//       alert("You cannot buy your own NFT.");
//       return;
//     }

//     try {
//       setBuying(mint);
//       const adapter = getAdapter();
//       if (!adapter) throw new Error("Wallet adapter not found");

//       const metaplex = getMetaplex(adapter);
//       const auctionHouse = await metaplex
//         .auctionHouse()
//         .findByAddress({ address: new PublicKey(AUCTION_HOUSE_ADDRESS) });

//       const listingsData = await metaplex.auctionHouse().findListings({
//         auctionHouse,
//       });

//       // Load all listings to get the full objects
//       const allListings = await Promise.all(
//         listingsData.map(async (l: any) =>
//           l.lazy ? await metaplex.auctionHouse().loadListing({ lazyListing: l }) : l
//         )
//       );

//       const target = allListings.find(
//         (l: any) => l.asset.address.toBase58() === mint
//       );

//       if (!target) throw new Error("Listing not found");

//       // ✅ Execute buy
//       const { purchase } = await metaplex.auctionHouse().buy({
//         auctionHouse,
//         listing: target,
//       });

//       // 🧾 Try to extract signature (for logging)
//       // @ts-ignore
//       const signature = purchase?.response?.signature || "unknown";

//       console.log("✅ Purchase successful:", purchase);
//       console.log("Signature:", signature);

//       // 🔹 Record purchase in Firestore
//       await addDoc(collection(db, "purchases"), {
//         mintAddress: mint,
//         buyer: wallet.publicKey?.toBase58(),
//         seller: target.sellerAddress.toBase58(),
//         price: target.price.basisPoints.toNumber() / 1e9,
//         tx: signature,
//         createdAt: serverTimestamp(),
//       });

//       // 🔹 Mark listing as sold
//       if (target.tradeStateAddress) {
//         try {
//           await updateDoc(doc(db, "listings", target.tradeStateAddress.toBase58()), {
//             status: "sold",
//             updatedAt: serverTimestamp(),
//           });
//         } catch (e) {
//           console.warn("⚠️ Could not mark listing as sold:", e);
//         }
//       }

//       // 🔹 Remove from UI instantly
//       setListings((prev) => prev.filter((l) => l.nftMint !== mint));

//       alert("🎉 Purchase successful!");
//     } catch (err) {
//       console.error("❌ Purchase failed:", err);
//       alert("Purchase failed. Check console for details.");
//     } finally {
//       setBuying(null);
//     }
//   };

//   return (
//     <div className="p-6 text-white max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">Marketplace</h1>

//       {loading ? (
//         <p className="text-center">Loading NFTs...</p>
//       ) : listings.length === 0 ? (
//         <p className="text-center text-gray-400">
//           No NFTs listed for sale right now.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {listings.map((nft) => (
//             <div
//               key={nft.nftMint}
//               className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
//             >
//               {nft.image ? (
//                 <img
//                   src={nft.image}
//                   alt={nft.name}
//                   className="w-full h-56 object-cover rounded-lg"
//                 />
//               ) : (
//                 <div className="w-full h-56 bg-gray-700 flex items-center justify-center rounded text-gray-400">
//                   No image
//                 </div>
//               )}

//               <h2 className="text-xl font-semibold mt-3">{nft.name}</h2>
//               <p className="text-sm text-gray-400 mb-2">{nft.description}</p>

//               <p className="text-green-400 font-semibold">
//                 {nft.price} {nft.currency}
//               </p>
//               <p className="text-xs text-gray-400 break-all mt-1">
//                 Seller: {nft.seller}
//               </p>

//               <button
//                 type="button"
//                 onClick={() => buyNFT(nft.nftMint, nft.seller)}
//                 disabled={buying === nft.nftMint}
//                 className={`mt-4 w-full px-4 py-2 rounded text-white ${
//                   buying === nft.nftMint
//                     ? "bg-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {buying === nft.nftMint ? "Buying..." : "Buy Now"}
//               </button>

//               <a
//                 href={`https://explorer.solana.com/address/${nft.nftMint}?cluster=devnet`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block mt-3 text-green-400 underline text-sm text-center"
//               >
//                 View on Solana Explorer
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListedNFTs;


// import React, { useEffect, useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { Connection, PublicKey } from "@solana/web3.js";
// import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
// import toast, { Toaster } from "react-hot-toast";
// import { AUCTION_HOUSE_ADDRESS, buyNFT } from "../utils/solana";

// const RPC_URL = "https://devnet.helius-rpc.com/?api-key=f0d2dece-416e-4676-8489-542f04bef695";

// interface ListedNFT {
//   mintAddress: string;
//   name: string;
//   image: string;
//   price: number;
//   sellerAddress: string;
// }

// const ListedNFTs: React.FC = () => {
//   const wallet = useWallet();
//   const [listedNFTs, setListedNFTs] = useState<ListedNFT[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Load active listings
//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         setLoading(true);
//         const connection = new Connection(RPC_URL, "confirmed");
//         const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet as any));


//         const auctionHouse = await metaplex
//           .auctionHouse()
//           .findByAddress({ address: new PublicKey(AUCTION_HOUSE_ADDRESS) });

//         const listings = await metaplex.auctionHouse().findListings({ auctionHouse });
//         const loadedListings = [];

//         for (const l of listings) {
//           try {
//             const listing = await metaplex.auctionHouse().loadListing({ lazyListing: l as any });
//             if (!listing.canceledAt) {
//               const nft = {
//                 mintAddress: listing.asset.address.toBase58(),
//                 name: listing.asset.name,
//                 image: listing.asset.json?.image ?? "",
//                 price: Number(listing.price.basisPoints.toNumber()) / 1_000_000_000,
//                 sellerAddress: listing.sellerAddress.toBase58(),
//               };
//               loadedListings.push(nft);
//             }
//           } catch (err) {
//             continue;
//           }
//         }

//         setListedNFTs(loadedListings);
//       } catch (err) {
//         console.error("❌ Failed to fetch listings:", err);
//         toast.error("Failed to load listed NFTs.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   // 💰 Handle Buy
//   const handleBuy = async (mintAddress: string, price: number) => {
//     if (!wallet.connected || !wallet.publicKey) {
//   toast.error("Please connect your wallet first.");
//   return;
// }


//     try {
//       toast.loading("Processing purchase...");
//       console.log(`Attempting to buy NFT: ${mintAddress} for ${price} SOL`);

//       const tx = await buyNFT(wallet as any, mintAddress, price);


//       toast.dismiss();
//       toast.success(`✅ Purchase complete! TX: ${tx}`);
//       setListedNFTs((prev) => prev.filter((n) => n.mintAddress !== mintAddress));
//     } catch (err: any) {
//       toast.dismiss();
//       console.error("❌ Purchase failed:", err);
//       toast.error(err?.message || "Purchase failed.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       <Toaster position="top-right" />
//       <h1 className="text-3xl font-bold mb-6 text-center">🛒 Listed NFTs</h1>

//       {loading ? (
//         <div className="text-center py-10 text-gray-400">Loading NFTs...</div>
//       ) : listedNFTs.length === 0 ? (
//         <div className="text-center py-10 text-gray-400">No NFTs listed yet.</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {listedNFTs.map((nft) => (
//             <div
//               key={nft.mintAddress}
//               className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all"
//             >
//               <img
//                 src={nft.image}
//                 alt={nft.name}
//                 className="rounded-xl mb-3 w-full h-52 object-cover"
//               />
//               <h3 className="text-lg font-semibold">{nft.name}</h3>
//               <p className="text-gray-400 text-sm mb-2">
//                 Seller: {nft.sellerAddress.slice(0, 5)}...{nft.sellerAddress.slice(-5)}
//               </p>
//               <p className="text-yellow-400 font-semibold mb-3">{nft.price} SOL</p>

//               <button
//                 onClick={() => handleBuy(nft.mintAddress, nft.price)}
//                 disabled={!wallet.connected}
//                 className={`w-full py-2 rounded-lg font-semibold ${
//                   wallet.connected
//                     ? "bg-green-600 hover:bg-green-700"
//                     : "bg-gray-600 cursor-not-allowed"
//                 }`}
//               >
//                 {wallet.connected ? "Buy NFT" : "Connect Wallet to Buy"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListedNFTs;

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

// RPC (use Helius or your preferred RPC)
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

  // ========================================================
  // 📦 Load Active Listings
  // ========================================================
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

  // ========================================================
  // 💰 Handle Buy
  // ========================================================
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

  // ========================================================
  // 🎨 UI
  // ========================================================
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Listed NFTs</h1>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading NFTs...</div>
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

              <button
                onClick={() => handleBuy(nft.mintAddress, nft.price)}
                disabled={!wallet.connected}
                className={`w-full py-2 rounded-lg font-semibold transition-all ${
                  wallet.connected
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
